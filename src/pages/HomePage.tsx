import { useRef } from 'react';
import { categories, getDishesByCategory } from '../data/dishes';
import DishCard from '../components/DishCard';
import DailyRecommend from '../components/DailyRecommend';
import TodayMenu from '../components/TodayMenu';
import { useDailyRec } from '../hooks/useDailyRec';
import { useFavorites } from '../hooks/useFavorites';
import { useCartContext } from '../hooks/CartContext';

const categoryNav = categories.map(c => ({ key: c.key, label: c.label, emoji: c.emoji, color: c.color }));

export default function HomePage() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { recommended, refresh } = useDailyRec(favorites);
  const { isInCart, addToCart, isInMenu, addToMenu, removeFromMenu, getMenuDishes, clearMenu, refreshMenu, menuConnected } = useCartContext();
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollTo = (key: string) => {
    sectionRefs.current[key]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const menuDishes = getMenuDishes().filter(Boolean) as NonNullable<ReturnType<typeof getMenuDishes>[number]>[];

  return (
    <div className="space-y-6">
      {/* === Daily recommendation === */}
      <DailyRecommend
        dishes={recommended}
        onRefresh={refresh}
        onAddToMenu={addToMenu}
        isInMenu={isInMenu}
      />

      {/* === Today's Menu === */}
      <TodayMenu
        dishes={menuDishes}
        onRemove={removeFromMenu}
        onClear={clearMenu}
        onRefresh={refreshMenu}
        connected={menuConnected}
      />

      {/* === Category quick nav === */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
        {categoryNav.map(cat => (
          <button
            key={cat.key}
            onClick={() => scrollTo(cat.key)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors active:scale-95 cursor-pointer bg-white text-gray-600 shadow-sm hover:shadow border border-gray-100"
            style={{ color: cat.color }}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {/* === All categories with dishes === */}
      <div className="space-y-8">
        {categories.map(cat => {
          const dishes = getDishesByCategory(cat.key);
          return (
            <div
              key={cat.key}
              ref={el => { sectionRefs.current[cat.key] = el; }}
            >
              {/* Section header */}
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-1 h-6 rounded-full flex-shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-xl">{cat.emoji}</span>
                <h2 className="text-base font-bold text-gray-800">{cat.label}</h2>
                <span className="text-xs text-gray-400 ml-auto">{dishes.length} 道</span>
              </div>

              {/* Dish grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {dishes.map(dish => (
                  <div id={`dish-${dish.id}`} key={dish.id} className="rounded-xl transition-all duration-300">
                    <DishCard
                      dish={dish}
                      isFavorite={isFavorite(dish.id)}
                      onToggleFavorite={toggleFavorite}
                      variant="menu"
                      onAddToCart={addToCart}
                      isInCart={isInCart(dish.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-300 pb-4 pt-2">
        🍳 小邱菜单 · {new Date().getFullYear()} · 两个人的人间烟火 · 共 53 道菜
      </div>
    </div>
  );
}
