import { useState, useEffect, useCallback } from 'react';
import { supabase, TABLES, fetchTable, startPolling, stopPolling } from '../lib/supabase';

const FAVORITES_KEY = 'xiaoqiu-favorites';

function loadLocal(): number[] {
  try { const r = localStorage.getItem(FAVORITES_KEY); return r ? JSON.parse(r) : []; } catch { return []; }
}
function saveLocal(ids: number[]): void { localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids)); }

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>(loadLocal);

  const refresh = useCallback(async () => {
    try {
      const data = await fetchTable(TABLES.FAVORITES);
      const ids = data.map((r: any) => r.dish_id);
      setFavorites(ids); saveLocal(ids);
    } catch {}
  }, []);

  useEffect(() => {
    refresh();
    startPolling(TABLES.FAVORITES, 5000, refresh);
    const onVisible = () => { if (document.visibilityState === 'visible') refresh(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => { stopPolling(TABLES.FAVORITES, refresh); document.removeEventListener('visibilitychange', onVisible); };
  }, [refresh]);

  const toggleFavorite = useCallback(async (id: number) => {
    const wasFav = favorites.includes(id);
    setFavorites(prev => { const n = prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]; saveLocal(n); return n; });
    wasFav
      ? await supabase.from(TABLES.FAVORITES).delete().eq('dish_id', id)
      : await supabase.from(TABLES.FAVORITES).insert({ dish_id: id });
  }, [favorites]);

  return { favorites, toggleFavorite, isFavorite: useCallback((id: number) => favorites.includes(id), [favorites]) };
}
