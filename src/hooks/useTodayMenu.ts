import { useState, useEffect, useCallback } from 'react';
import { supabase, TABLES, fetchTable, startPolling, stopPolling } from '../lib/supabase';
import { getDishById } from '../data/dishes';

const STORAGE_KEY = 'xiaoqiu-today-menu';

interface TodayMenuItem { dishId: number; id?: number; }

function loadLocal(): TodayMenuItem[] {
  try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : []; } catch { return []; }
}
function saveLocal(items: TodayMenuItem[]): void { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }

export function useTodayMenu() {
  const [menu, setMenu] = useState<TodayMenuItem[]>(loadLocal);

  const refresh = useCallback(async () => {
    try {
      const data = await fetchTable(TABLES.TODAY_MENU);
      const items = data.map((r: any) => ({ dishId: r.dish_id, id: r.id }));
      setMenu(items);
      saveLocal(items);
    } catch {}
  }, []);

  useEffect(() => {
    refresh();
    startPolling(TABLES.TODAY_MENU, 5000, refresh);
    const onVisible = () => { if (document.visibilityState === 'visible') refresh(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      stopPolling(TABLES.TODAY_MENU, refresh);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [refresh]);

  const addDish = useCallback(async (dishId: number) => {
    setMenu(prev => { if (prev.some(i => i.dishId === dishId)) return prev; const n = [...prev, { dishId }]; saveLocal(n); return n; });
    await supabase.from(TABLES.TODAY_MENU).insert({ dish_id: dishId });
  }, []);

  const removeDish = useCallback(async (dishId: number) => {
    setMenu(prev => { const n = prev.filter(i => i.dishId !== dishId); saveLocal(n); return n; });
    await supabase.from(TABLES.TODAY_MENU).delete().eq('dish_id', dishId);
  }, []);

  const addMultiple = useCallback(async (dishIds: number[]) => {
    setMenu(prev => {
      const existing = new Set(prev.map(i => i.dishId));
      const newItems = dishIds.filter(id => !existing.has(id)).map(id => ({ dishId: id }));
      const n = [...prev, ...newItems]; saveLocal(n); return n;
    });
    await supabase.from(TABLES.TODAY_MENU).insert(dishIds.map(id => ({ dish_id: id })));
  }, []);

  const clearMenu = useCallback(async () => {
    setMenu([]); saveLocal([]);
    await supabase.from(TABLES.TODAY_MENU).delete().neq('dish_id', -1);
  }, []);

  const getDishes = useCallback(() => {
    return menu.map(item => getDishById(item.dishId)).filter(Boolean);
  }, [menu]);

  return { menu, addDish, removeDish, addMultiple, clearMenu, getDishes, refresh, connected: true };
}
