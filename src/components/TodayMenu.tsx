import { Dish, categories } from '../data/dishes';

interface TodayMenuProps {
  dishes: Dish[];
  onRemove: (id: number) => void;
  onClear: () => void;
  onRefresh?: () => void;
  connected?: boolean;
}

export default function TodayMenu({ dishes, onRemove, onClear, onRefresh, connected }: TodayMenuProps) {
  if (dishes.length === 0) return null;

  const grouped = categories
    .map(cat => ({ ...cat, items: dishes.filter(d => d.category === cat.key) }))
    .filter(g => g.items.length > 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-green-200 overflow-hidden">
      <div className="bg-gradient-to-r from-green-400 to-emerald-500 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">📋</span>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              今日菜单
              <span className={`w-2 h-2 rounded-full ${connected ? 'bg-green-200' : 'bg-yellow-300'}`} />
            </h2>
            <p className="text-xs text-white/70">{dishes.length} 道菜{!connected && ' · 离线模式'}</p>
          </div>
        </div>
        <div className="flex gap-1.5">
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="px-2.5 py-1.5 bg-white/20 rounded-full text-xs font-medium text-white hover:bg-white/30 active:scale-95 transition-all cursor-pointer"
            >
              🔄
            </button>
          )}
          <button
            onClick={onClear}
            className="px-2.5 py-1.5 bg-white/20 rounded-full text-xs font-medium text-white hover:bg-white/30 active:scale-95 transition-all cursor-pointer"
          >
            清空
          </button>
        </div>
      </div>

      <div className="p-3 space-y-3">
        {grouped.map(group => (
          <div key={group.key}>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-sm">{group.emoji}</span>
              <span className="text-xs font-medium text-gray-500">{group.label}</span>
            </div>
            <div className="space-y-1.5">
              {group.items.map(dish => (
                <div key={dish.id} className="flex items-center gap-3 p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center text-xl flex-shrink-0">
                    {dish.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-800 truncate">{dish.name}</div>
                    {dish.tags && dish.tags.length > 0 && (
                      <div className="flex gap-1 mt-0.5">
                        {dish.tags.map(tag => <span key={tag} className="text-[10px] text-gray-400">{tag}</span>)}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => onRemove(dish.id)}
                    className="text-gray-300 hover:text-red-400 text-lg opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
