import { useState, useEffect, useCallback } from 'react';
import { supabase, TABLES } from '../lib/supabase';
import { getDishById } from '../data/dishes';

const STORAGE_KEY = 'xiaoqiu-today-menu';

interface TodayMenuItem {
  dishId: number;
  id?: number;
}

function loadLocal(): TodayMenuItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as TodayMenuItem[];
  } catch {}
  return [];
}

function saveLocal(items: TodayMenuItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function useTodayMenu() {
  const [menu, setMenu] = useState<TodayMenuItem[]>(loadLocal);
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { data, error } = await supabase
        .from(TABLES.TODAY_MENU)
        .select('*')
        .order('created_at', { ascending: true });

      if (!cancelled && !error && data) {
        const items = data.map((r: any) => ({ dishId: r.dish_id, id: r.id }));
        setMenu(items);
        saveLocal(items);
      }
      if (!cancelled) setSynced(true);
    }

    load();

    // Real-time: listen for inserts & deletes from other devices
    const channel = supabase
      .channel('today-menu-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: TABLES.TODAY_MENU },
        (payload: any) => {
          setMenu(prev => {
            if (prev.some(m => m.dishId === payload.new.dish_id)) return prev;
            const next = [...prev, { dishId: payload.new.dish_id, id: payload.new.id }];
            saveLocal(next);
            return next;
          });
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: TABLES.TODAY_MENU },
        (payload: any) => {
          setMenu(prev => {
            const next = prev.filter(m => m.dishId !== payload.old.dish_id);
            saveLocal(next);
            return next;
          });
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      channel.unsubscribe();
    };
  }, []);

  const addDish = useCallback(async (dishId: number) => {
    setMenu(prev => {
      if (prev.some(item => item.dishId === dishId)) return prev;
      const next = [...prev, { dishId }];
      saveLocal(next);
      return next;
    });
    await supabase.from(TABLES.TODAY_MENU).insert({ dish_id: dishId });
  }, []);

  const removeDish = useCallback(async (dishId: number) => {
    setMenu(prev => {
      const next = prev.filter(item => item.dishId !== dishId);
      saveLocal(next);
      return next;
    });
    await supabase.from(TABLES.TODAY_MENU).delete().eq('dish_id', dishId);
  }, []);

  const addMultiple = useCallback(async (dishIds: number[]) => {
    setMenu(prev => {
      const existing = new Set(prev.map(i => i.dishId));
      const newItems = dishIds.filter(id => !existing.has(id)).map(id => ({ dishId: id }));
      const next = [...prev, ...newItems];
      saveLocal(next);
      return next;
    });
    await supabase.from(TABLES.TODAY_MENU).insert(dishIds.map(id => ({ dish_id: id })));
  }, []);

  const clearMenu = useCallback(async () => {
    setMenu([]);
    saveLocal([]);
    await supabase.from(TABLES.TODAY_MENU).delete().neq('dish_id', -1);
  }, []);

  const getDishes = useCallback(() => {
    return menu.map(item => getDishById(item.dishId)).filter(Boolean);
  }, [menu]);

  return { menu, addDish, removeDish, addMultiple, clearMenu, getDishes, synced };
}
