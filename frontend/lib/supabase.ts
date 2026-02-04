import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace these with your actual Supabase project credentials
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'demo-key';

// Create Supabase client with fallback for demo mode
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Demo mode check
export const isDemoMode = supabaseUrl === 'https://demo.supabase.co' || supabaseAnonKey === 'demo-key';

// Types for our database
export interface Profile {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  member_since: string;
  dark_mode: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserFavorite {
  id: string;
  user_id: string;
  movie_id: string;
  created_at: string;
}

export interface UserWatchlist {
  id: string;
  user_id: string;
  movie_id: string;
  created_at: string;
}

export interface UserReview {
  id: string;
  user_id: string;
  movie_id: string;
  rating: number;
  review?: string;
  created_at: string;
  updated_at: string;
}

export interface WatchHistory {
  id: string;
  user_id: string;
  movie_id: string;
  watched_at: string;
}

export interface MovieCache {
  id: string;
  title: string;
  overview?: string;
  poster_path?: string;
  backdrop_path?: string;
  release_date?: string;
  vote_average?: number;
  vote_count?: number;
  genre_ids?: number[];
  adult: boolean;
  original_language?: string;
  popularity?: number;
  cached_at: string;
  updated_at: string;
}