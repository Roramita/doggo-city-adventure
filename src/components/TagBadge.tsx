import { X } from 'lucide-react';

interface TagBadgeProps {
  name: string;
  color: string;
  onRemove?: () => void;
  onClick?: () => void;
}

export const TagBadge: React.FC<TagBadgeProps> = ({ name, color, onRemove, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-80 cursor-pointer"
      style={{ backgroundColor: color }}
    >
      {name}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 hover:opacity-70"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};
