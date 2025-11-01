# Notes App - Features

## Authentication
- User registration and login with email/password
- Secure session management with Supabase
- Protected routes
- Auto-logout handling

## Note Management
- Create new notes with title and content
- View all notes in a beautiful card grid layout
- Edit existing notes
- Delete notes with single click
- Real-time search and filtering by title and content
- Pin/unpin notes to keep them at the top
- Display last updated time for each note

## User Experience
- Dark theme optimized for reduced eye strain
- Responsive design for all screen sizes
- Toast notifications for all actions
- Loading states while fetching data
- Empty state messaging
- Smooth transitions and hover effects
- Keyboard shortcuts (Ctrl/Cmd + Enter to save)

## Security
- Row Level Security (RLS) enabled on all database tables
- Users can only access their own notes
- Secure authentication with Supabase Auth
- Automatic session management

## Database
- Supabase PostgreSQL backend
- Optimized indexes for fast queries
- Proper foreign key relationships
- Data persistence across sessions

## UI/UX Components
- Custom Note Cards with preview text
- Note Dialog for creating/editing
- Tag badges for categorization
- Search bar with live filtering
- Logout button for account management
- Skeleton loaders while fetching
