import { useParams, Link } from 'react-router-dom';
import { Category, categories, getDishesByCategory } from '../data/dishes';
import DishCard from '../components/DishCard';
import { useFavorites } from '../hooks/useFavorites';
import { useCartContext } from '../hooks/CartContext';

export default function CategoryPage() {
  const { type } = useParams<{ type: string }>();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isInCart, addToCart } = useCartContext();

  const categoryInfo = categories.find(c => c.key === type);
  const dishes = getDishesByCategory((type as Category) || 'beef');

  if (!categoryInfo) {
    return (
      <div className="text-center py-20">
        <span className="text-5xl">🤷</span>
        <p className="text-gray-400 mt-4">分类不存在</p>
        <Link to="/" className="text-orange-500 mt-2 inline-block">返回首页</Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Link
          to="/"
          className="text-gray-400 hover:text-gray-600 text-xl transition-colors"
        >
          ←
        </Link>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{ backgroundColor: `${categoryInfo.color}15` }}
        >
          {categoryInfo.emoji}
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800">{categoryInfo.label}</h2>
          <p className="text-xs text-gray-400">{categoryInfo.description} · {dishes.length} 道</p>
        </div>
      </div>

      {/* Dish grid */}
      {dishes.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-5xl">🍽️</span>
          <p className="text-gray-400 mt-4">这个分类还没有菜品</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {dishes.map(dish => (
            <DishCard
              key={dish.id}
              dish={dish}
              isFavorite={isFavorite(dish.id)}
              onToggleFavorite={toggleFavorite}
              onAddToCart={addToCart}
              isInCart={isInCart(dish.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
