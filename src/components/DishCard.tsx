import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dish } from '../data/dishes';
import FavoriteButton from './FavoriteButton';

interface DishCardProps {
  dish: Dish;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  variant?: 'card' | 'menu';
}

export default function DishCard({ dish, isFavorite, onToggleFavorite, variant = 'card' }: DishCardProps) {
  const [imgError, setImgError] = useState(false);

  const isMenu = variant === 'menu';

  return (
    <Link
      to={`/dish/${dish.id}`}
      className={`group block bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 active:scale-[0.97] ${
        isMenu ? 'rounded-xl' : 'rounded-2xl hover:shadow-lg'
      }`}
    >
      {/* Image area */}
      <div className={`relative bg-gradient-to-br from-orange-50 to-orange-100 overflow-hidden ${
        isMenu ? 'aspect-[5/4]' : 'aspect-[4/3]'
      }`}>
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

        {/* Favorite button on top */}
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

      {/* Dish name */}
      <div className={isMenu ? 'px-2.5 py-2' : 'p-3'}>
        <h3 className={`font-semibold text-gray-800 leading-tight line-clamp-1 ${
          isMenu ? 'text-xs' : 'text-sm'
        }`}>
          {dish.name}
        </h3>
      </div>
    </Link>
  );
}
