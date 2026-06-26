import { Link } from 'react-router-dom';
import { CategoryInfo } from '../data/dishes';

interface CategoryCardProps {
  category: CategoryInfo;
  count: number;
}

export default function CategoryCard({ category, count }: CategoryCardProps) {
  return (
    <Link
      to={`/category/${category.key}`}
      className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 active:scale-95 gap-2"
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
        style={{ backgroundColor: `${category.color}15` }}
      >
        <span>{category.emoji}</span>
      </div>
      <span className="text-sm font-semibold text-gray-800">{category.label}</span>
      <span className="text-xs text-gray-400">{count} 道</span>
    </Link>
  );
}
