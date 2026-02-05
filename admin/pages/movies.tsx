import { useState, useEffect } from 'react'
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  PencilIcon, 
  TrashIcon,
  EyeIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface Movie {
  id: string
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  release_date: string
  vote_average: number
  vote_count: number
  genres: string
  runtime?: number
  director?: string
  movie_cast?: string
  status: 'published' | 'draft' | 'archived'
  created_at: string
  updated_at: string
  total_favorites: number
  total_reviews: number
  average_rating: string
}

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalMovies, setTotalMovies] = useState(0)
  const [newMovie, setNewMovie] = useState({
    title: '',
    overview: '',
    poster_path: '',
    backdrop_path: '',
    release_date: '',
    vote_average: 0,
    runtime: 0,
    director: '',
    movie_cast: '',
    genres: ''
  })

  useEffect(() => {
    fetchMovies()
  }, [currentPage])

  const fetchMovies = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('adminToken')
      if (!token) return

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20'
      })

      const response = await fetch(`http://localhost:3000/api/admin/movies/stats?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setMovies(data.movies || [])
        setTotalPages(data.totalPages || 1)
        setTotalMovies(data.total || 0)
      } else {
        toast.error('Failed to fetch movies')
        // Fallback to sample data for demo
        setMovies([
          {
            id: '1',
            title: 'The Dark Knight',
            overview: 'Batman faces the Joker in this epic superhero film.',
            poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
            backdrop_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
            release_date: '2008-07-18',
            vote_average: 9.0,
            vote_count: 25000,
            genres: 'Action, Crime, Drama',
            runtime: 152,
            director: 'Christopher Nolan',
            movie_cast: 'Christian Bale, Heath Ledger, Aaron Eckhart',
            status: 'published' as const,
            created_at: '2024-01-01',
            updated_at: '2024-01-01',
            total_favorites: 1500,
            total_reviews: 500,
            average_rating: '9.0'
          },
          {
            id: '2',
            title: 'Inception',
            overview: 'A thief who steals corporate secrets through dream-sharing technology.',
            poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
            backdrop_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
            release_date: '2010-07-16',
            vote_average: 8.8,
            vote_count: 20000,
            genres: 'Action, Sci-Fi, Thriller',
            runtime: 148,
            director: 'Christopher Nolan',
            movie_cast: 'Leonardo DiCaprio, Marion Cotillard, Tom Hardy',
            status: 'published' as const,
            created_at: '2024-01-01',
            updated_at: '2024-01-01',
            total_favorites: 1200,
            total_reviews: 400,
            average_rating: '8.8'
          }
        ])
      }
    } catch (error) {
      console.error('Error fetching movies:', error)
      toast.error('Error fetching movies')
    } finally {
      setLoading(false)
    }
  }

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.overview.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddMovie = async () => {
    if (!newMovie.title || !newMovie.overview) {
      toast.error('Please fill in required fields')
      return
    }

    try {
      const token = localStorage.getItem('adminToken')
      if (!token) return

      const response = await fetch('http://localhost:3000/api/admin/movies', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMovie)
      })

      if (response.ok) {
        const addedMovie = await response.json()
        setMovies([addedMovie, ...movies])
        setNewMovie({
          title: '',
          overview: '',
          poster_path: '',
          backdrop_path: '',
          release_date: '',
          vote_average: 0,
          runtime: 0,
          director: '',
          movie_cast: '',
          genres: ''
        })
        setShowAddModal(false)
        toast.success('Movie added successfully')
        fetchMovies() // Refresh the list
      } else {
        toast.error('Failed to add movie')
      }
    } catch (error) {
      console.error('Error adding movie:', error)
      toast.error('Error adding movie')
    }
  }

  const handleUpdateMovie = async (movieId: string, updates: Partial<Movie>) => {
    try {
      const token = localStorage.getItem('adminToken')
      if (!token) return

      const response = await fetch(`http://localhost:3000/api/admin/movies/${movieId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      })

      if (response.ok) {
        const updatedMovie = await response.json()
        setMovies(movies.map(movie => 
          movie.id === movieId ? updatedMovie : movie
        ))
        toast.success('Movie updated successfully')
      } else {
        toast.error('Failed to update movie')
      }
    } catch (error) {
      console.error('Error updating movie:', error)
      toast.error('Error updating movie')
    }
  }

  const handleDeleteMovie = async (movieId: string) => {
    if (!confirm('Are you sure you want to delete this movie? This action cannot be undone.')) {
      return
    }

    try {
      const token = localStorage.getItem('adminToken')
      if (!token) return

      const response = await fetch(`http://localhost:3000/api/admin/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        setMovies(movies.filter(movie => movie.id !== movieId))
        toast.success('Movie deleted successfully')
      } else {
        toast.error('Failed to delete movie')
      }
    } catch (error) {
      console.error('Error deleting movie:', error)
      toast.error('Error deleting movie')
    }
  }

  const toggleMovieStatus = async (movieId: string) => {
    const movie = movies.find(m => m.id === movieId);
    if (!movie) return;

    const newStatus = movie.status === 'published' ? 'archived' : 'published';
    await handleUpdateMovie(movieId, { status: newStatus });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-600">Loading movies...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Movies Management</h1>
            <p className="mt-2 text-blue-100">
              Manage your movie catalog • {totalMovies} total movies
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors font-semibold shadow-lg"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add Movie</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search movies by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        />
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              {movie.poster_path ? (
                <img
                  src={movie.poster_path.startsWith('http') ? movie.poster_path : `https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <span className="text-gray-600 font-medium">No Image</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900 truncate">{movie.title}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  movie.status === 'published' 
                    ? 'bg-green-100 text-green-800' 
                    : movie.status === 'draft'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {movie.status}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{movie.overview}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="font-medium">{movie.release_date}</span>
                <div className="flex items-center space-x-1">
                  <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-semibold">{movie.vote_average}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => toggleMovieStatus(movie.id)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    movie.status === 'published'
                      ? 'bg-red-100 hover:bg-red-200 text-red-700'
                      : 'bg-green-100 hover:bg-green-200 text-green-700'
                  }`}
                >
                  <EyeIcon className="h-4 w-4 inline mr-1" />
                  {movie.status === 'published' ? 'Archive' : 'Publish'}
                </button>
                <button
                  onClick={() => setEditingMovie(movie)}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteMovie(movie.id)}
                  className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMovies.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM9 6v12h6V6H9z" />
            </svg>
          </div>
          <p className="text-xl font-medium text-gray-900 mb-2">No movies found</p>
          <p className="text-gray-500">Try adjusting your search terms or add a new movie.</p>
        </div>
      )}

      {/* Add Movie Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-6 text-gray-900">Add New Movie</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={newMovie.title}
                  onChange={(e) => setNewMovie({...newMovie, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter movie title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Overview *</label>
                <textarea
                  value={newMovie.overview}
                  onChange={(e) => setNewMovie({...newMovie, overview: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Enter movie description"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Release Date</label>
                  <input
                    type="date"
                    value={newMovie.release_date}
                    onChange={(e) => setNewMovie({...newMovie, release_date: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Rating (0-10)</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={newMovie.vote_average}
                    onChange={(e) => setNewMovie({...newMovie, vote_average: parseFloat(e.target.value) || 0})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Director</label>
                <input
                  type="text"
                  value={newMovie.director}
                  onChange={(e) => setNewMovie({...newMovie, director: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Director name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Genres</label>
                <input
                  type="text"
                  value={newMovie.genres}
                  onChange={(e) => setNewMovie({...newMovie, genres: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Action, Drama, Thriller"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-8">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMovie}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold"
              >
                Add Movie
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}