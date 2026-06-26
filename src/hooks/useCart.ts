import { useState, useEffect, useCallback } from 'react';
import { getDishById, Dish } from '../data/dishes';
import { supabase, TABLES, fetchTable, startPolling, stopPolling } from '../lib/supabase';

interface CartItem { dishId: number; }
const STORAGE_KEY = 'xiaoqiu-cart';

function loadLocal(): CartItem[] {
  try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : []; } catch { return []; }
}
function saveLocal(items: CartItem[]): void { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(loadLocal);

  const refresh = useCallback(async () => {
    try {
      const data = await fetchTable(TABLES.CART);
      const items = data.map((r: any) => ({ dishId: r.dish_id }));
      setCart(items); saveLocal(items);
    } catch {}
  }, []);

  useEffect(() => {
    refresh();
    startPolling(TABLES.CART, 5000, refresh);
    const onVisible = () => { if (document.visibilityState === 'visible') refresh(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => { stopPolling(TABLES.CART, refresh); document.removeEventListener('visibilitychange', onVisible); };
  }, [refresh]);

  const addToCart = useCallback(async (dishId: number) => {
    setCart(prev => { if (prev.some(i => i.dishId === dishId)) return prev; const n = [...prev, { dishId }]; saveLocal(n); return n; });
    await supabase.from(TABLES.CART).insert({ dish_id: dishId });
  }, []);
  const removeFromCart = useCallback(async (dishId: number) => {
    setCart(prev => { const n = prev.filter(i => i.dishId !== dishId); saveLocal(n); return n; });
    await supabase.from(TABLES.CART).delete().eq('dish_id', dishId);
  }, []);
  const clearCart = useCallback(async () => { setCart([]); saveLocal([]); await supabase.from(TABLES.CART).delete().neq('dish_id', -1); }, []);

  return {
    cart, addToCart, removeFromCart, clearCart,
    isInCart: useCallback((id: number) => cart.some(i => i.dishId === id), [cart]),
    getCartDishes: useCallback((): Dish[] => cart.map(i => getDishById(i.dishId)).filter((d): d is Dish => d !== undefined), [cart]),
    cartCount: cart.length,
  };
}
