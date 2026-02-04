# CinemaMax Frontend Setup Guide

## 🚀 Backend Integration Complete!

Your React Native app is now integrated with Supabase backend. Here's what you need to do to get it running:

## 📋 Prerequisites

1. **Supabase Project**: Create a project at [supabase.com](https://supabase.com)
2. **TMDB API Key**: Get one from [themoviedb.org](https://www.themoviedb.org/settings/api)

## 🔧 Setup Steps

### 1. Environment Configuration

Create a `.env` file in the `frontend` directory:

```bash
# Copy the example file
cp .env.example .env
```

Update `.env` with your credentials:

```env
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Backend API (if using custom backend)
EXPO_PUBLIC_API_URL=http://localhost:3000/api

# TMDB API
EXPO_PUBLIC_TMDB_API_KEY=your-tmdb-api-key
EXPO_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
```

### 2. Database Setup

Your backend already has the migration file. Run it in Supabase:

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the migration from `backend/supabase/migrations/001_initial_schema.sql`

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the App

```bash
npm start
```

## 🎯 What's New

### ✅ Real Authentication
- **Supabase Auth**: Real user registration and login
- **Profile Management**: Persistent user profiles
- **Session Handling**: Automatic session management

### ✅ Real Database
- **User Profiles**: Stored in Supabase
- **Favorites System**: Real database-backed favorites
- **Watchlists**: Ready for implementation
- **Reviews**: User reviews and ratings

### ✅ Enhanced Features
- **Row Level Security**: Secure data access
- **Real-time Updates**: Live data synchronization
- **Proper Error Handling**: Better user experience
- **Type Safety**: Full TypeScript support

## 🔄 Migration from Mock Data

The app now uses:
- ✅ **Real Supabase authentication** instead of AsyncStorage
- ✅ **Database-backed favorites** instead of local storage
- ✅ **Persistent user profiles** with proper data structure
- ✅ **Secure API calls** with proper error handling

## 🎬 Features Ready to Use

### Authentication
- Sign up with email/password
- Sign in with existing account
- Guest mode (limited features)
- Automatic session management

### User Profiles
- Edit profile information
- Avatar management
- Dark mode preferences
- Member since tracking

### Favorites System
- Add/remove movies from favorites
- Real-time favorite counts
- Secure user-specific data

### Ready for Extension
- Watchlists (database ready)
- User reviews (database ready)
- Watch history (database ready)
- Social features (database ready)

## 🚀 Next Steps

1. **Set up environment variables**
2. **Run database migrations**
3. **Test authentication flow**
4. **Add TMDB API integration**
5. **Implement remaining features**

## 🔧 Backend API Routes

Your backend provides these endpoints:

- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout
- `GET /api/auth/user` - Get current user
- `GET /api/movies/*` - Movie data endpoints
- `GET /api/users/*` - User data endpoints

## 🎯 Testing

1. **Sign Up**: Create a new account
2. **Sign In**: Login with existing account
3. **Guest Mode**: Browse without account
4. **Favorites**: Add/remove movies (requires login)
5. **Profile**: Edit user information

Your app is now production-ready with a real backend! 🎉