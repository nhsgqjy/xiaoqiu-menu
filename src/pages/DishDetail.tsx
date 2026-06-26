import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getDishById, categories } from '../data/dishes';
import FavoriteButton from '../components/FavoriteButton';
import { useFavorites } from '../hooks/useFavorites';

export default function DishDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [imgError, setImgError] = useState(false);

  const dish = getDishById(Number(id));

  if (!dish) {
    return (
      <div className="text-center py-20">
        <span className="text-5xl">🤷</span>
        <p className="text-gray-400 mt-4">菜品不存在</p>
        <button onClick={() => navigate(-1)} className="text-orange-500 mt-2">返回</button>
      </div>
    );
  }

  const categoryInfo = categories.find(c => c.key === dish.category);
  const fav = isFavorite(dish.id);

  return (
    <div className="space-y-5">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="text-gray-400 hover:text-gray-600 text-xl transition-colors"
      >
        ← 返回
      </button>

      {/* Hero image */}
      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100 shadow-md">
        {!imgError ? (
          <img
            src={dish.image}
            alt={dish.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-8xl">{dish.emoji}</span>
          </div>
        )}

        {/* Favorite */}
        <div className="absolute top-4 right-4">
          <FavoriteButton
            isFav={fav}
            onToggle={() => toggleFavorite(dish.id)}
            size="md"
          />
        </div>

        {/* Tags */}
        {dish.tags && dish.tags.length > 0 && (
          <div className="absolute top-4 left-4 flex gap-1">
            {dish.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 text-sm font-medium rounded-full bg-white/80 backdrop-blur-sm text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Info card */}
      <div className="bg-white rounded-3xl p-5 shadow-sm space-y-4">
        {/* Name & category */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{dish.name}</h1>
            {categoryInfo && (
              <span
                className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: `${categoryInfo.color}15`,
                  color: categoryInfo.color,
                }}
              >
                {categoryInfo.emoji} {categoryInfo.label}
              </span>
            )}
          </div>
        </div>

        {/* Action bar */}
        <div className="flex gap-3">
          <button
            onClick={() => toggleFavorite(dish.id)}
            className={`flex-1 py-3 rounded-2xl font-medium text-sm transition-all active:scale-95 ${
              fav
                ? 'bg-red-50 text-red-500 border border-red-200'
                : 'bg-orange-500 text-white'
            }`}
          >
            {fav ? '❤️ 已收藏' : '🤍 收藏这道菜'}
          </button>
        </div>

        {/* Notes */}
        {dish.notes ? (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-500">📝 做法备注</h3>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {dish.notes}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-sm text-gray-300">
            暂无备注，做了之后记得来补充～
          </div>
        )}
      </div>
    </div>
  );
}
