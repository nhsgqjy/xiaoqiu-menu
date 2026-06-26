import { useState, useEffect, useCallback } from 'react';
import { supabase, TABLES, fetchTable, subscribeTable } from '../lib/supabase';
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
  const [connected, setConnected] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const data = await fetchTable(TABLES.TODAY_MENU);
      const items = data.map((r: any) => ({ dishId: r.dish_id, id: r.id }));
      setMenu(items);
      saveLocal(items);
      setConnected(true);
    } catch {
      setConnected(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    refresh().then(() => { if (!cancelled) setConnected(true); });

    // Real-time subscription
    const channel = subscribeTable(
      TABLES.TODAY_MENU,
      'today-menu',
      (dishId) => {
        setMenu(prev => {
          if (prev.some(m => m.dishId === dishId)) return prev;
          const next = [...prev, { dishId }];
          saveLocal(next);
          return next;
        });
      },
      (dishId) => {
        setMenu(prev => {
          const next = prev.filter(m => m.dishId !== dishId);
          saveLocal(next);
          return next;
        });
      }
    );

    // Refresh when tab becomes visible (user switches back to browser)
    const onVisible = () => {
      if (document.visibilityState === 'visible') refresh();
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      cancelled = true;
      channel.unsubscribe();
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [refresh]);

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

  return { menu, addDish, removeDish, addMultiple, clearMenu, getDishes, refresh, connected };
}
