# CinemaMax Backend

Backend services for the CinemaMax movie app built with Node.js, Express, and Supabase.

## 🚀 Features

- **Authentication**: User signup, signin, and profile management
- **Movie Data**: Integration with TMDB API for movie information
- **User Features**: Favorites, watchlist, reviews, and watch history
- **Real-time**: Supabase real-time subscriptions
- **Security**: Row Level Security (RLS) policies

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- TMDB API key (optional, for movie data)

## 🛠 Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Copy the example environment file:
```bash
cp .env.example .env
```

Fill in your environment variables:
```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# TMDB API Configuration
TMDB_API_KEY=your_tmdb_api_key

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 3. Supabase Setup

#### Option A: Use Supabase Cloud
1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and API keys from Settings > API
3. Run the migration in the Supabase dashboard SQL editor:
   ```sql
   -- Copy and paste the content from supabase/migrations/001_initial_schema.sql
   ```

#### Option B: Use Local Supabase (Recommended for Development)
1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Initialize Supabase:
   ```bash
   supabase init
   ```

3. Start local Supabase:
   ```bash
   supabase start
   ```

4. Apply migrations:
   ```bash
   supabase db reset
   ```

### 4. Get TMDB API Key (Optional)

1. Sign up at [themoviedb.org](https://www.themoviedb.org/)
2. Go to Settings > API
3. Create a new API key
4. Add it to your `.env` file

## 🏃‍♂️ Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on `http://localhost:3000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/signin` - Sign in user
- `POST /api/auth/signout` - Sign out user
- `GET /api/auth/user` - Get current user info

### Movies (TMDB Integration)
- `GET /api/movies/popular` - Get popular movies
- `GET /api/movies/trending` - Get trending movies
- `GET /api/movies/:id` - Get movie details
- `GET /api/movies/search/:query` - Search movies
- `GET /api/movies/genres/list` - Get movie genres
- `GET /api/movies/genre/:genreId` - Get movies by genre

### User Features (Requires Authentication)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/favorites` - Get user favorites
- `POST /api/users/favorites/:movieId` - Add to favorites
- `DELETE /api/users/favorites/:movieId` - Remove from favorites
- `GET /api/users/watchlist` - Get user watchlist
- `POST /api/users/watchlist/:movieId` - Add to watchlist
- `DELETE /api/users/watchlist/:movieId` - Remove from watchlist

### Health Check
- `GET /health` - Server health status

## 🗄️ Database Schema

### Tables
- `profiles` - User profile information
- `user_favorites` - User's favorite movies
- `user_watchlist` - User's watchlist
- `user_reviews` - User movie reviews and ratings
- `watch_history` - User's watch history
- `movies_cache` - Cached movie data from TMDB

### Security
- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Public read access for movie cache

## 🔧 Development

### Database Migrations
```bash
# Create new migration
supabase migration new migration_name

# Apply migrations
supabase db reset

# Generate TypeScript types
npm run db:generate
```

### Testing
```bash
# Run tests (when implemented)
npm test
```

## 📦 Deployment

### Supabase Cloud
1. Push your database schema:
   ```bash
   supabase db push
   ```

### Backend Deployment (Vercel/Railway/Heroku)
1. Set environment variables in your deployment platform
2. Deploy the backend code
3. Update frontend API URL to point to your deployed backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details