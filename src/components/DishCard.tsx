import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dish } from '../data/dishes';
import FavoriteButton from './FavoriteButton';

interface DishCardProps {
  dish: Dish;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  variant?: 'card' | 'menu';
  onAddToCart?: (id: number) => void;
  isInCart?: boolean;
}

export default function DishCard({
  dish,
  isFavorite,
  onToggleFavorite,
  variant = 'card',
  onAddToCart,
  isInCart = false,
}: DishCardProps) {
  const [imgError, setImgError] = useState(false);
  const isMenu = variant === 'menu';

  const imageArea = (
    <div
      className={`relative bg-gradient-to-br from-orange-50 to-orange-100 overflow-hidden ${
        isMenu ? 'aspect-[5/4]' : 'aspect-[4/3]'
      }`}
    >
      {!imgError ? (
        <img
          src={dish.image}
          alt={dish.name}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className={isMenu ? 'text-4xl' : 'text-5xl'}>{dish.emoji}</span>
        </div>
      )}

      {/* Favorite button */}
      <div className={`absolute ${isMenu ? 'top-1 right-1' : 'top-2 right-2'}`}>
        <FavoriteButton
          isFav={isFavorite}
          onToggle={() => onToggleFavorite(dish.id)}
          size="sm"
        />
      </div>

      {/* Tags */}
      {dish.tags && dish.tags.length > 0 && (
        <div className={`absolute ${isMenu ? 'top-1 left-1' : 'top-2 left-2'} flex gap-1`}>
          {dish.tags.map(tag => (
            <span
              key={tag}
              className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-white/80 backdrop-blur-sm text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`group bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 active:scale-[0.97] ${
        isMenu ? 'rounded-xl' : 'rounded-2xl hover:shadow-lg'
      }`}
    >
      {/* Image (clickable to detail) */}
      <Link to={`/dish/${dish.id}`} className="block">
        {imageArea}
      </Link>

      {/* Bottom bar: name + cart button */}
      <div className={`flex items-center gap-1 ${isMenu ? 'px-2 py-1.5' : 'px-3 py-2'}`}>
        <Link
          to={`/dish/${dish.id}`}
          className="flex-1 min-w-0"
        >
          <h3 className={`font-semibold text-gray-800 leading-tight line-clamp-1 ${
            isMenu ? 'text-xs' : 'text-sm'
          }`}>
            {dish.name}
          </h3>
        </Link>

        {/* Add to cart button */}
        {onAddToCart && (
          <button
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart(dish.id);
            }}
            disabled={isInCart}
            className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all active:scale-75 cursor-pointer ${
              isInCart
                ? 'bg-green-100 text-green-500'
                : 'bg-orange-100 text-orange-500 hover:bg-orange-200'
            }`}
            title={isInCart ? '已在购物车' : '加入购物车'}
          >
            {isInCart ? '✓' : '+'}
          </button>
        )}
      </div>
    </div>
  );
}
