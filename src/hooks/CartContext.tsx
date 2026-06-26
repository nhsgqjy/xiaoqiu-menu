import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useCart } from './useCart';
import { useTodayMenu } from './useTodayMenu';
import { Dish } from '../data/dishes';

interface CartContextType {
  // Cart
  cartCount: number;
  isInCart: (id: number) => boolean;
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  getCartDishes: () => Dish[];
  clearCart: () => void;
  // Today's menu
  isInMenu: (id: number) => boolean;
  addToMenu: (id: number) => void;
  removeFromMenu: (id: number) => void;
  getMenuDishes: () => (Dish | undefined)[];
  clearMenu: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCart();
  const menu = useTodayMenu();

  const isInMenu = useCallback((id: number) => {
    return menu.menu.some(item => item.dishId === id);
  }, [menu.menu]);

  const value: CartContextType = {
    cartCount: cart.cartCount,
    isInCart: cart.isInCart,
    addToCart: cart.addToCart,
    removeFromCart: cart.removeFromCart,
    getCartDishes: cart.getCartDishes,
    clearCart: cart.clearCart,
    isInMenu,
    addToMenu: menu.addDish,
    removeFromMenu: menu.removeDish,
    getMenuDishes: menu.getDishes,
    clearMenu: menu.clearMenu,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCartContext must be used within CartProvider');
  return ctx;
}
