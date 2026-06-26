import { useState, useEffect, useCallback } from 'react';
import { getDishById, Dish } from '../data/dishes';
import { supabase, TABLES } from '../lib/supabase';

interface CartItem {
  dishId: number;
}

const STORAGE_KEY = 'xiaoqiu-cart';

function loadLocal(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as CartItem[];
  } catch {}
  return [];
}

function saveLocal(items: CartItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(loadLocal);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const { data, error } = await supabase
        .from(TABLES.CART)
        .select('dish_id');
      if (!cancelled && !error && data) {
        const items = data.map((r: any) => ({ dishId: r.dish_id }));
        setCart(items);
        saveLocal(items);
      }
    }
    load();

    const channel = supabase
      .channel('cart-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: TABLES.CART },
        (payload: any) => {
          setCart(prev => {
            if (prev.some(c => c.dishId === payload.new.dish_id)) return prev;
            const next = [...prev, { dishId: payload.new.dish_id }];
            saveLocal(next);
            return next;
          });
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: TABLES.CART },
        (payload: any) => {
          setCart(prev => {
            const next = prev.filter(c => c.dishId !== payload.old.dish_id);
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

  const addToCart = useCallback(async (dishId: number) => {
    setCart(prev => {
      if (prev.some(item => item.dishId === dishId)) return prev;
      const next = [...prev, { dishId }];
      saveLocal(next);
      return next;
    });
    await supabase.from(TABLES.CART).insert({ dish_id: dishId });
  }, []);

  const removeFromCart = useCallback(async (dishId: number) => {
    setCart(prev => {
      const next = prev.filter(item => item.dishId !== dishId);
      saveLocal(next);
      return next;
    });
    await supabase.from(TABLES.CART).delete().eq('dish_id', dishId);
  }, []);

  const clearCart = useCallback(async () => {
    setCart([]);
    saveLocal([]);
    await supabase.from(TABLES.CART).delete().neq('dish_id', -1);
  }, []);

  const isInCart = useCallback((dishId: number) => {
    return cart.some(item => item.dishId === dishId);
  }, [cart]);

  const getCartDishes = useCallback((): Dish[] => {
    return cart
      .map(item => getDishById(item.dishId))
      .filter((d): d is Dish => d !== undefined);
  }, [cart]);

  const cartCount = cart.length;

  return { cart, addToCart, removeFromCart, clearCart, isInCart, getCartDishes, cartCount };
}
