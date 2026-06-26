import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { getDishById, categories } from '../data/dishes';
import DishCard from '../components/DishCard';
import { useCartContext } from '../hooks/CartContext';

export default function FavoritesPage() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { isInCart, addToCart } = useCartContext();

  // Group favorites by category
  const favoriteDishes = favorites
    .map(id => getDishById(id))
    .filter(Boolean);

  const groupedCategories = categories
    .map(cat => ({
      ...cat,
      dishes: favoriteDishes.filter(d => d && d.category === cat.key),
    }))
    .filter(g => g.dishes.length > 0);

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-gray-800">❤️ 我的收藏</h2>

      {favoriteDishes.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-5xl">📭</span>
          <p className="text-gray-400 mt-4">还没有收藏任何菜品</p>
          <p className="text-gray-400 text-sm">去首页逛逛，收藏你喜欢的菜吧！</p>
          <Link
            to="/"
            className="inline-block mt-4 px-6 py-2 bg-orange-500 text-white rounded-full text-sm font-medium hover:bg-orange-600 active:scale-95 transition-all"
          >
            去逛逛 →
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {groupedCategories.map(group => (
            <div key={group.key}>
              <div className="flex items-center gap-2 mb-3">
                <span>{group.emoji}</span>
                <h3 className="text-sm font-semibold text-gray-600">{group.label}</h3>
                <span className="text-xs text-gray-400">{group.dishes.length} 道</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {group.dishes.map(dish => (
                  <DishCard
                    key={dish!.id}
                    dish={dish!}
                    isFavorite={isFavorite(dish!.id)}
                    onToggleFavorite={toggleFavorite}
                    onAddToCart={addToCart}
                    isInCart={isInCart(dish!.id)}
                  />
                ))}
              </div>
            </div>
          ))}

          <div className="text-center text-xs text-gray-300 pb-4">
            共收藏 {favoriteDishes.length} 道菜
          </div>
        </div>
      )}
    </div>
  );
}
