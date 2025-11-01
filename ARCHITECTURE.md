# Application Architecture

## Frontend Structure

```
src/
├── pages/
│   ├── Login.tsx          # Login page
│   ├── Register.tsx       # Registration page
│   ├── Notes.tsx          # Main notes dashboard
│   ├── Index.tsx          # Home redirect
│   └── NotFound.tsx       # 404 page
├── components/
│   ├── NoteCard.tsx       # Individual note display
│   ├── NoteDialog.tsx     # Create/edit note modal
│   ├── TagBadge.tsx       # Tag display component
│   ├── ProtectedRoute.tsx # Route protection wrapper
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── supabase.ts        # Supabase client init
│   └── auth-context.tsx   # Auth state management
└── App.tsx                # Main app component with routing
```

## Authentication Flow

1. User registers with email/password
2. Supabase Auth stores credentials
3. On login, session token is created
4. AuthProvider wraps app and manages auth state
5. ProtectedRoute checks authentication before rendering pages
6. Auto-logout on session expiration

## Data Flow

1. **Create Note**: User → NoteDialog → Supabase → Notes list updates
2. **Read Notes**: On page load, Notes component fetches from Supabase
3. **Update Note**: User edits → NoteDialog → Supabase → List re-fetches
4. **Delete Note**: Confirmation → Supabase DELETE → List updates
5. **Search**: Real-time filtering on client-side (no new queries)

## Database Schema

### notes table
- id (UUID, primary key)
- user_id (UUID, FK to auth.users)
- title (text)
- content (text)
- is_pinned (boolean)
- created_at (timestamp)
- updated_at (timestamp)

### tags table (for future expansion)
- id (UUID, primary key)
- user_id (UUID, FK to auth.users)
- name (text)
- color (text)
- created_at (timestamp)

### note_tags table (for future expansion)
- note_id (UUID, FK to notes)
- tag_id (UUID, FK to tags)

## Security

- **RLS Policies**: Users can only access their own data
- **Session Management**: Supabase handles token refresh
- **Protected Routes**: Components check auth before rendering
- **Environment Variables**: Secrets stored in .env

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui + Radix UI
- **Backend**: Supabase (PostgreSQL + Auth)
- **State Management**: React Context API
- **Routing**: React Router v6
- **Notifications**: Sonner
- **Styling**: Tailwind CSS

## Performance Optimizations

- Server-side ordering (pinned first, then by date)
- Client-side search filtering (instant results)
- Indexed database queries on user_id and timestamps
- Lazy loading of components
- Skeleton loaders for better UX during loading
