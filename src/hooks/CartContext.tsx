import { createContext, useContext, useCallback, ReactNode } from 'react';
import { useCart } from './useCart';
import { useTodayMenu } from './useTodayMenu';
import { Dish } from '../data/dishes';

interface CartContextType {
  cartCount: number;
  isInCart: (id: number) => boolean;
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  getCartDishes: () => Dish[];
  clearCart: () => void;
  isInMenu: (id: number) => boolean;
  addToMenu: (id: number) => void;
  removeFromMenu: (id: number) => void;
  getMenuDishes: () => (Dish | undefined)[];
  clearMenu: () => void;
  refreshMenu: () => void;
  menuConnected: boolean;
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
    refreshMenu: menu.refresh,
    menuConnected: menu.connected,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCartContext must be used within CartProvider');
  return ctx;
}
