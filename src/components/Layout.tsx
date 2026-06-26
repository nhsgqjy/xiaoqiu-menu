import { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useCartContext } from '../hooks/CartContext';
import CartDrawer from './CartDrawer';

const navItems = [
  { to: '/', label: '首页', emoji: '🏠' },
  { to: '/favorites', label: '收藏', emoji: '❤️' },
];

export default function Layout() {
  const location = useLocation();
  const [cartOpen, setCartOpen] = useState(false);
  const { cartCount, getCartDishes, removeFromCart, clearCart, addToMenu } = useCartContext();

  const handleConfirm = () => {
    const dishes = getCartDishes();
    dishes.forEach(d => addToMenu(d.id));
    clearCart();
    setCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">
            🍳 小邱菜单
          </h1>
          <nav className="flex gap-1 items-center">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-orange-100 text-orange-600'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`
                }
              >
                {item.emoji} {item.label}
              </NavLink>
            ))}
            {/* Cart button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative px-2 py-1.5 rounded-full text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-lg mx-auto px-4 py-4">
        <div className="page-enter" key={location.key}>
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-t border-gray-100 lg:hidden">
        <div className="max-w-lg mx-auto flex">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center py-2 text-xs font-medium transition-colors ${
                  isActive ? 'text-orange-500' : 'text-gray-400'
                }`
              }
            >
              <span className="text-xl mb-0.5">{item.emoji}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
          {/* Cart tab */}
          <button
            onClick={() => setCartOpen(true)}
            className="flex-1 flex flex-col items-center py-2 text-xs font-medium text-gray-400 relative cursor-pointer"
          >
            <span className="text-xl mb-0.5">🛒</span>
            <span>点菜</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1/4 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Cart drawer */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        dishes={getCartDishes()}
        onRemove={removeFromCart}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
