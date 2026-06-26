import { Link } from 'react-router-dom';
import { Dish } from '../data/dishes';

interface DailyRecommendProps {
  dishes: Dish[];
  onRefresh: () => void;
  isFavorite: (id: number) => boolean;
}

const mealLabels = ['🥩 荤', '🥬 素', '🍜 搭'];

export default function DailyRecommend({ dishes, onRefresh, isFavorite }: DailyRecommendProps) {
  return (
    <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-5 text-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">今日推荐</h2>
          <p className="text-sm text-white/70">荤素搭配，营养美味</p>
        </div>
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/30 active:scale-95 transition-all cursor-pointer"
        >
          🔄 换一批
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {dishes.map((dish, i) => (
          <Link
            key={dish.id}
            to={`/dish/${dish.id}`}
            className="group bg-white/15 backdrop-blur-sm rounded-2xl p-3 hover:bg-white/25 active:scale-95 transition-all"
          >
            <div className="text-3xl text-center mb-2">{dish.emoji}</div>
            <div className="text-xs text-center text-white/70 mb-1">{mealLabels[i]}</div>
            <div className="text-sm font-medium text-center leading-tight line-clamp-1">
              {dish.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
