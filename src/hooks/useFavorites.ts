import { useState, useEffect, useCallback } from 'react';
import { supabase, TABLES, fetchTable, subscribeTable } from '../lib/supabase';

const FAVORITES_KEY = 'xiaoqiu-favorites';

function loadLocal(): number[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (raw) return JSON.parse(raw) as number[];
  } catch {}
  return [];
}

function saveLocal(ids: number[]): void {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>(loadLocal);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await fetchTable(TABLES.FAVORITES);
        if (!cancelled) {
          const ids = data.map((r: any) => r.dish_id);
          setFavorites(ids);
          saveLocal(ids);
        }
      } catch {}
    }
    load();

    const channel = subscribeTable(TABLES.FAVORITES, 'favorites',
      (dishId) => { setFavorites(prev => { if (prev.includes(dishId)) return prev; const n = [...prev, dishId]; saveLocal(n); return n; }); },
      (dishId) => { setFavorites(prev => { const n = prev.filter(id => id !== dishId); saveLocal(n); return n; }); }
    );

    const onVisible = () => { if (document.visibilityState === 'visible') load(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => { cancelled = true; channel.unsubscribe(); document.removeEventListener('visibilitychange', onVisible); };
  }, []);

  const toggleFavorite = useCallback(async (id: number) => {
    const wasFav = favorites.includes(id);
    setFavorites(prev => { const n = prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]; saveLocal(n); return n; });
    wasFav
      ? await supabase.from(TABLES.FAVORITES).delete().eq('dish_id', id)
      : await supabase.from(TABLES.FAVORITES).insert({ dish_id: id });
  }, [favorites]);

  return { favorites, toggleFavorite, isFavorite: useCallback((id: number) => favorites.includes(id), [favorites]) };
}
