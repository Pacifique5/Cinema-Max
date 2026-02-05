// Unified API configuration for frontend to use the same PostgreSQL backend
// This replaces Supabase and connects to the same backend as admin panels

const API_BASE_URL = 'http://localhost:3000'; // Same backend as admin panels

export interface User {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

export interface Movie {
  id: string;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genres: string;
  director?: string;
  movie_cast?: string;
  runtime?: number;
}

export interface Favorite {
  id: string;
  user_id: string;
  movie_id: string;
  created_at: string;
}

export interface Review {
  id: string;
  user_id: string;
  movie_id: string;
  rating: number;
  comment?: string;
  created_at: string;
}

// API helper functions
export const api = {
  // Authentication
  signUp: async (email: string, password: string, name: string, username: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, username })
    });
    return await response.json();
  },

  signIn: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return await response.json();
  },

  signOut: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/signout`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      }
    });
    return await response.json();
  },

  getCurrentUser: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/user`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      }
    });
    return await response.json();
  },

  // User profile
  getProfile: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      }
    });
    return await response.json();
  },

  updateProfile: async (token: string, updates: Partial<User>) => {
    const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(updates)
    });
    return await response.json();
  },

  // Movies
  getMovies: async (page = 1) => {
    const response = await fetch(`${API_BASE_URL}/api/movies?page=${page}`);
    return await response.json();
  },

  getPopularMovies: async (page = 1) => {
    const response = await fetch(`${API_BASE_URL}/api/movies/popular?page=${page}`);
    return await response.json();
  },

  getTrendingMovies: async (timeWindow = 'week') => {
    const response = await fetch(`${API_BASE_URL}/api/movies/trending?time_window=${timeWindow}`);
    return await response.json();
  },

  getMovieDetails: async (movieId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/movies/${movieId}`);
    return await response.json();
  },

  searchMovies: async (query: string, page = 1) => {
    const response = await fetch(`${API_BASE_URL}/api/movies/search/${encodeURIComponent(query)}?page=${page}`);
    return await response.json();
  },

  getGenres: async () => {
    const response = await fetch(`${API_BASE_URL}/api/movies/genres/list`);
    return await response.json();
  },

  getMoviesByGenre: async (genreId: string, page = 1) => {
    const response = await fetch(`${API_BASE_URL}/api/movies/genre/${genreId}?page=${page}`);
    return await response.json();
  },

  // Favorites
  getFavorites: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/users/favorites`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      }
    });
    return await response.json();
  },

  addToFavorites: async (token: string, movieId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/users/favorites/${movieId}`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      }
    });
    return await response.json();
  },

  removeFromFavorites: async (token: string, movieId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/users/favorites/${movieId}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      }
    });
    return await response.json();
  },

  // Reviews
  getReviews: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/users/reviews`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      }
    });
    return await response.json();
  },

  addReview: async (token: string, movieId: string, rating: number, comment?: string) => {
    const response = await fetch(`${API_BASE_URL}/api/users/reviews/${movieId}`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ rating, comment })
    });
    return await response.json();
  },

  updateReview: async (token: string, movieId: string, rating: number, comment?: string) => {
    const response = await fetch(`${API_BASE_URL}/api/users/reviews/${movieId}`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ rating, comment })
    });
    return await response.json();
  },

  deleteReview: async (token: string, movieId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/users/reviews/${movieId}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      }
    });
    return await response.json();
  }
};

export default api;