import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2, Pin } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Note {
  id: string;
  title: string;
  content: string;
  is_pinned: boolean;
  updated_at: string;
}

interface NoteCardProps {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePin: () => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onEdit,
  onDelete,
  onTogglePin,
}) => {
  const preview = note.content.substring(0, 100);
  const updatedAt = formatDistanceToNow(new Date(note.updated_at), { addSuffix: true });

  return (
    <Card className="border-slate-700 bg-slate-800 hover:border-slate-600 transition-colors cursor-pointer group">
      <CardContent className="p-4 pb-0">
        <div
          onClick={onEdit}
          className="space-y-2 cursor-pointer"
        >
          <h3 className="font-semibold text-white text-lg truncate group-hover:text-blue-400 transition-colors">
            {note.title || 'Untitled'}
          </h3>
          <p className="text-slate-400 text-sm line-clamp-3">
            {preview}
            {note.content.length > 100 ? '...' : ''}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-4 pb-4">
        <span className="text-xs text-slate-500">{updatedAt}</span>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={onTogglePin}
            className={`h-8 w-8 p-0 ${note.is_pinned ? 'text-yellow-400' : 'text-slate-500'}`}
            title={note.is_pinned ? 'Unpin' : 'Pin'}
          >
            <Pin className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onEdit}
            className="h-8 w-8 p-0 text-slate-500 hover:text-white"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onDelete}
            className="h-8 w-8 p-0 text-slate-500 hover:text-red-400"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
