const axios = require('axios');

const TMDB_BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

if (!TMDB_API_KEY) {
  console.warn('⚠️  TMDB_API_KEY not found. Movie data features will be limited.');
}

const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY
  }
});

// Helper functions for TMDB API
const tmdbAPI = {
  // Get popular movies
  getPopularMovies: async (page = 1) => {
    const response = await tmdbClient.get('/movie/popular', { params: { page } });
    return response.data;
  },

  // Get trending movies
  getTrendingMovies: async (timeWindow = 'week') => {
    const response = await tmdbClient.get(`/trending/movie/${timeWindow}`);
    return response.data;
  },

  // Get movie details
  getMovieDetails: async (movieId) => {
    const response = await tmdbClient.get(`/movie/${movieId}`);
    return response.data;
  },

  // Search movies
  searchMovies: async (query, page = 1) => {
    const response = await tmdbClient.get('/search/movie', { 
      params: { query, page } 
    });
    return response.data;
  },

  // Get movie genres
  getGenres: async () => {
    const response = await tmdbClient.get('/genre/movie/list');
    return response.data;
  },

  // Get movies by genre
  getMoviesByGenre: async (genreId, page = 1) => {
    const response = await tmdbClient.get('/discover/movie', {
      params: { with_genres: genreId, page }
    });
    return response.data;
  }
};

module.exports = {
  tmdbClient,
  tmdbAPI
};