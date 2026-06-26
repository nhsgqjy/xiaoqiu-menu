import { useState, useEffect, useCallback } from 'react';
import { supabase, TABLES } from '../lib/supabase';

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

  // Initial load from Supabase
  useEffect(() => {
    let cancelled = false;
    async function load() {
      const { data, error } = await supabase
        .from(TABLES.FAVORITES)
        .select('dish_id');
      if (!cancelled && !error && data) {
        const ids = data.map((r: any) => r.dish_id);
        setFavorites(ids);
        saveLocal(ids);
      }
    }
    load();

    const channel = supabase
      .channel('favorites-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: TABLES.FAVORITES },
        (payload: any) => {
          setFavorites(prev => {
            if (prev.includes(payload.new.dish_id)) return prev;
            const next = [...prev, payload.new.dish_id];
            saveLocal(next);
            return next;
          });
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: TABLES.FAVORITES },
        (payload: any) => {
          setFavorites(prev => {
            const next = prev.filter(id => id !== payload.old.dish_id);
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

  const toggleFavorite = useCallback(async (id: number) => {
    const wasFav = favorites.includes(id);
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id];
      saveLocal(next);
      return next;
    });
    if (wasFav) {
      await supabase.from(TABLES.FAVORITES).delete().eq('dish_id', id);
    } else {
      await supabase.from(TABLES.FAVORITES).insert({ dish_id: id });
    }
  }, [favorites]);

  const isFavorite = useCallback(
    (id: number) => favorites.includes(id),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
}
