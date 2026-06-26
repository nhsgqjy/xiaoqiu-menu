import { useState, useEffect, useCallback } from 'react';
import { getDishById } from '../data/dishes';

interface TodayMenuItem {
  dishId: number;
  addedAt: string; // ISO date string
}

const STORAGE_KEY = 'xiaoqiu-today-menu';

function loadMenu(): TodayMenuItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as TodayMenuItem[];
  } catch {}
  return [];
}

function saveMenu(items: TodayMenuItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function useTodayMenu() {
  const [menu, setMenu] = useState<TodayMenuItem[]>(loadMenu);

  useEffect(() => {
    saveMenu(menu);
  }, [menu]);

  const addDish = useCallback((dishId: number) => {
    setMenu(prev => {
      if (prev.some(item => item.dishId === dishId)) return prev;
      return [...prev, { dishId, addedAt: new Date().toISOString() }];
    });
  }, []);

  const removeDish = useCallback((dishId: number) => {
    setMenu(prev => prev.filter(item => item.dishId !== dishId));
  }, []);

  const addMultiple = useCallback((dishIds: number[]) => {
    setMenu(prev => {
      const existing = new Set(prev.map(i => i.dishId));
      const newItems = dishIds
        .filter(id => !existing.has(id))
        .map(id => ({ dishId: id, addedAt: new Date().toISOString() }));
      return [...prev, ...newItems];
    });
  }, []);

  const clearMenu = useCallback(() => {
    setMenu([]);
  }, []);

  const getDishes = useCallback(() => {
    return menu
      .map(item => getDishById(item.dishId))
      .filter(Boolean);
  }, [menu]);

  return { menu, addDish, removeDish, addMultiple, clearMenu, getDishes };
}
