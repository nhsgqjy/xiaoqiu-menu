import { Link } from 'react-router-dom';
import { Dish } from '../data/dishes';

interface DailyRecommendProps {
  dishes: Dish[];
  onRefresh: () => void;
  onAddToMenu: (id: number) => void;
  isInMenu: (id: number) => boolean;
}

const mealLabels = ['🥩 荤', '🥬 素', '🍜 搭'];

export default function DailyRecommend({ dishes, onRefresh, onAddToMenu, isInMenu }: DailyRecommendProps) {
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
        {dishes.map((dish, i) => {
          const inMenu = isInMenu(dish.id);
          return (
            <div key={dish.id} className="flex flex-col gap-2">
              {/* Card (clickable to detail) */}
              <Link
                to={`/dish/${dish.id}`}
                className="block bg-white/15 backdrop-blur-sm rounded-2xl p-3 hover:bg-white/25 active:scale-95 transition-all"
              >
                <div className="text-3xl text-center mb-2">{dish.emoji}</div>
                <div className="text-xs text-center text-white/70 mb-1">{mealLabels[i]}</div>
                <div className="text-sm font-medium text-center leading-tight line-clamp-1">
                  {dish.name}
                </div>
              </Link>

              {/* Add to menu button — clean + below card */}
              <button
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!inMenu) onAddToMenu(dish.id);
                }}
                className={`w-full py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer ${
                  inMenu
                    ? 'bg-white/15 text-white/60'
                    : 'bg-white text-orange-500 hover:bg-orange-50 shadow-sm'
                }`}
              >
                {inMenu ? '✓' : '+'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
