const express = require('express');
const { tmdbAPI } = require('../config/tmdb');
const { supabase } = require('../config/supabase');
const router = express.Router();

// Get popular movies
router.get('/popular', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const data = await tmdbAPI.getPopularMovies(page);
    res.json(data);
  } catch (error) {
    console.error('Popular movies error:', error);
    res.status(500).json({ error: 'Failed to fetch popular movies' });
  }
});

// Get trending movies
router.get('/trending', async (req, res) => {
  try {
    const timeWindow = req.query.time_window || 'week';
    const data = await tmdbAPI.getTrendingMovies(timeWindow);
    res.json(data);
  } catch (error) {
    console.error('Trending movies error:', error);
    res.status(500).json({ error: 'Failed to fetch trending movies' });
  }
});

// Get movie details
router.get('/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const data = await tmdbAPI.getMovieDetails(movieId);
    res.json(data);
  } catch (error) {
    console.error('Movie details error:', error);
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
});

// Search movies
router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const page = req.query.page || 1;
    const data = await tmdbAPI.searchMovies(query, page);
    res.json(data);
  } catch (error) {
    console.error('Search movies error:', error);
    res.status(500).json({ error: 'Failed to search movies' });
  }
});

// Get genres
router.get('/genres/list', async (req, res) => {
  try {
    const data = await tmdbAPI.getGenres();
    res.json(data);
  } catch (error) {
    console.error('Genres error:', error);
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
});

// Get movies by genre
router.get('/genre/:genreId', async (req, res) => {
  try {
    const genreId = req.params.genreId;
    const page = req.query.page || 1;
    const data = await tmdbAPI.getMoviesByGenre(genreId, page);
    res.json(data);
  } catch (error) {
    console.error('Movies by genre error:', error);
    res.status(500).json({ error: 'Failed to fetch movies by genre' });
  }
});

module.exports = router;