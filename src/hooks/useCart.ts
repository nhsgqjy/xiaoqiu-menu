import { useState, useEffect, useCallback } from 'react';
import { getDishById, Dish } from '../data/dishes';

interface CartItem {
  dishId: number;
}

const STORAGE_KEY = 'xiaoqiu-cart';

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as CartItem[];
  } catch {}
  return [];
}

function saveCart(items: CartItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const addToCart = useCallback((dishId: number) => {
    setCart(prev => {
      if (prev.some(item => item.dishId === dishId)) return prev;
      return [...prev, { dishId }];
    });
  }, []);

  const removeFromCart = useCallback((dishId: number) => {
    setCart(prev => prev.filter(item => item.dishId !== dishId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
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
