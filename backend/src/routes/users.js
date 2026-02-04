const express = require('express');
const { supabase } = require('../config/supabase');
const router = express.Router();

// Middleware to verify user
const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header' });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth verification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get user profile
router.get('/profile', verifyUser, async (req, res) => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
router.put('/profile', verifyUser, async (req, res) => {
  try {
    const { name, avatar_url } = req.body;
    
    const updates = {};
    if (name) updates.name = name;
    if (avatar_url) updates.avatar_url = avatar_url;
    
    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', req.user.id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user favorites
router.get('/favorites', verifyUser, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('user_favorites')
      .select('movie_id, created_at')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add to favorites
router.post('/favorites/:movieId', verifyUser, async (req, res) => {
  try {
    const movieId = req.params.movieId;

    const { data, error } = await supabase
      .from('user_favorites')
      .insert({
        user_id: req.user.id,
        movie_id: movieId
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return res.status(400).json({ error: 'Movie already in favorites' });
      }
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Added to favorites', data });
  } catch (error) {
    console.error('Add favorite error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Remove from favorites
router.delete('/favorites/:movieId', verifyUser, async (req, res) => {
  try {
    const movieId = req.params.movieId;

    const { error } = await supabase
      .from('user_favorites')
      .delete()
      .eq('user_id', req.user.id)
      .eq('movie_id', movieId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user watchlist
router.get('/watchlist', verifyUser, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('user_watchlist')
      .select('movie_id, created_at')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    console.error('Get watchlist error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add to watchlist
router.post('/watchlist/:movieId', verifyUser, async (req, res) => {
  try {
    const movieId = req.params.movieId;

    const { data, error } = await supabase
      .from('user_watchlist')
      .insert({
        user_id: req.user.id,
        movie_id: movieId
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return res.status(400).json({ error: 'Movie already in watchlist' });
      }
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Added to watchlist', data });
  } catch (error) {
    console.error('Add watchlist error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Remove from watchlist
router.delete('/watchlist/:movieId', verifyUser, async (req, res) => {
  try {
    const movieId = req.params.movieId;

    const { error } = await supabase
      .from('user_watchlist')
      .delete()
      .eq('user_id', req.user.id)
      .eq('movie_id', movieId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Removed from watchlist' });
  } catch (error) {
    console.error('Remove watchlist error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;