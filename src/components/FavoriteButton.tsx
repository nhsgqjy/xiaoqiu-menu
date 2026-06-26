interface FavoriteButtonProps {
  isFav: boolean;
  onToggle: () => void;
  size?: 'sm' | 'md';
}

export default function FavoriteButton({ isFav, onToggle, size = 'md' }: FavoriteButtonProps) {
  const sizeClass = size === 'sm' ? 'text-lg p-1' : 'text-2xl p-2';

  return (
    <button
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      className={`${sizeClass} rounded-full transition-all duration-200 hover:scale-125 active:scale-90 cursor-pointer select-none`}
      aria-label={isFav ? '取消收藏' : '收藏'}
    >
      {isFav ? '❤️' : '🤍'}
    </button>
  );
}
