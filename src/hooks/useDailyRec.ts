import { useState, useCallback } from 'react';
import { Dish } from '../data/dishes';
import { generateRecommendation } from '../utils/recommendation';

const RECENT_KEY = 'xiaoqiu-recent-recs';
const MAX_RECENT = 21; // 7 days * 3 dishes

function loadRecent(): number[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (raw) return JSON.parse(raw) as number[];
  } catch {}
  return [];
}

function saveRecent(ids: number[]): void {
  localStorage.setItem(RECENT_KEY, JSON.stringify(ids.slice(-MAX_RECENT)));
}

export function useDailyRec(favoriteIds: number[]) {
  const [recommended, setRecommended] = useState<Dish[]>(() => {
    const recent = loadRecent();
    return generateRecommendation(favoriteIds, recent);
  });

  const [recentIds, setRecentIds] = useState<number[]>(loadRecent);

  const refresh = useCallback(() => {
    const recs = generateRecommendation(favoriteIds, recentIds);
    setRecommended(recs);

    const newRecent = [...recentIds, ...recs.map(d => d.id)];
    setRecentIds(newRecent);
    saveRecent(newRecent);
  }, [favoriteIds, recentIds]);

  return { recommended, refresh };
}
