import { Dish } from '../data/dishes';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  dishes: Dish[];
  onRemove: (id: number) => void;
  onConfirm: () => void;
}

export default function CartDrawer({ open, onClose, dishes, onRemove, onConfirm }: CartDrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-lg bg-white rounded-t-3xl shadow-2xl animate-slide-up max-h-[70vh] flex flex-col">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="px-5 py-3 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">
            🛒 已选菜品
            <span className="text-sm font-normal text-gray-400 ml-2">{dishes.length} 道</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Dish list */}
        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-2">
          {dishes.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-4xl">🛒</span>
              <p className="text-gray-400 mt-3">还没有选菜</p>
              <p className="text-gray-300 text-sm">去菜单里逛逛吧～</p>
            </div>
          ) : (
            dishes.map(dish => (
              <div
                key={dish.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center text-2xl flex-shrink-0">
                  {dish.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800 truncate">{dish.name}</div>
                  <div className="text-xs text-gray-400">{dish.emoji}</div>
                </div>
                <button
                  onClick={() => onRemove(dish.id)}
                  className="w-8 h-8 rounded-full bg-red-50 text-red-400 flex items-center justify-center hover:bg-red-100 active:scale-90 transition-all cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {dishes.length > 0 && (
          <div className="px-5 py-4 border-t border-gray-100">
            <button
              onClick={onConfirm}
              className="w-full py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-base rounded-2xl hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer"
            >
              ✅ 确认下单 · {dishes.length} 道菜
            </button>
          </div>
        )}
      </div>

      {/* Animation */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
