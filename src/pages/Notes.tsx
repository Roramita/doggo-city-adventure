import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { LogOut, Plus, Trash2, Pin, Search } from 'lucide-react';
import { NoteDialog } from '@/components/NoteDialog';
import { NoteCard } from '@/components/NoteCard';

interface Note {
  id: string;
  title: string;
  content: string;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

const Notes = () => {
  const { user, signOut } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const fetchNotes = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.id)
        .order('is_pinned', { ascending: false })
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setNotes(data || []);
      setFilteredNotes(data || []);
    } catch (error: any) {
      toast.error('Failed to load notes');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [user]);

  useEffect(() => {
    const filtered = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [searchQuery, notes]);

  const handleCreateNote = async (title: string, content: string) => {
    if (!user) return;

    try {
      const { error } = await supabase.from('notes').insert({
        user_id: user.id,
        title: title || 'Untitled',
        content,
      });

      if (error) throw error;
      toast.success('Note created!');
      setShowDialog(false);
      fetchNotes();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create note');
    }
  };

  const handleUpdateNote = async (id: string, title: string, content: string) => {
    try {
      const { error } = await supabase
        .from('notes')
        .update({
          title: title || 'Untitled',
          content,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;
      toast.success('Note updated!');
      setShowDialog(false);
      setSelectedNote(null);
      fetchNotes();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update note');
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      const { error } = await supabase.from('notes').delete().eq('id', id);

      if (error) throw error;
      toast.success('Note deleted');
      fetchNotes();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete note');
    }
  };

  const handleTogglePin = async (id: string, isPinned: boolean) => {
    try {
      const { error } = await supabase
        .from('notes')
        .update({ is_pinned: !isPinned })
        .eq('id', id);

      if (error) throw error;
      fetchNotes();
    } catch (error: any) {
      toast.error('Failed to update note');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out');
    } catch (error: any) {
      toast.error(error.message || 'Logout failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Notes</h1>
            <p className="text-slate-400">Welcome, {user?.email}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="text-slate-400 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>
          <Button
            onClick={() => {
              setSelectedNote(null);
              setShowDialog(true);
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Note
          </Button>
        </div>

        {showDialog && (
          <NoteDialog
            note={selectedNote}
            onSave={selectedNote ? handleUpdateNote : handleCreateNote}
            onClose={() => {
              setShowDialog(false);
              setSelectedNote(null);
            }}
          />
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-lg" />
            ))}
          </div>
        ) : filteredNotes.length === 0 ? (
          <Card className="border-slate-700 bg-slate-800 text-center py-12">
            <CardContent>
              <p className="text-slate-400 text-lg mb-4">
                {searchQuery ? 'No notes found matching your search' : 'No notes yet'}
              </p>
              {!searchQuery && (
                <Button
                  onClick={() => {
                    setSelectedNote(null);
                    setShowDialog(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create your first note
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={() => {
                  setSelectedNote(note);
                  setShowDialog(true);
                }}
                onDelete={() => handleDeleteNote(note.id)}
                onTogglePin={() => handleTogglePin(note.id, note.is_pinned)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
