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
        setMovies(data.movies)
        setTotalPages(data.totalPages)
        setTotalMovies(data.total)
      } else {
        toast.error('Failed to fetch movies')
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

    setMovies([movie, ...movies])
    setNewMovie({
      title: '',
      overview: '',
      poster_path: '',
      backdrop_path: '',
      release_date: '',
      vote_average: 0,
      runtime: 0,
      genre_ids: []
    })
    setShowAddModal(false)
    toast.success('Movie added successfully!')
  }

  const handleDeleteMovie = (id: string) => {
    if (confirm('Are you sure you want to delete this movie?')) {
      setMovies(movies.filter(m => m.id !== id))
      toast.success('Movie deleted successfully!')
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
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Movies</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage movie content and metadata ({movies.length} total)
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Movie</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="card overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>
            <div className="card-body">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{movie.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  movie.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {movie.status}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{movie.overview}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{movie.release_date}</span>
                <div className="flex items-center space-x-1">
                  <StarIcon className="h-4 w-4 text-yellow-400" />
                  <span>{movie.vote_average}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => toggleMovieStatus(movie.id)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded text-sm transition-colors"
                >
                  <EyeIcon className="h-4 w-4 inline mr-1" />
                  {movie.status === 'published' ? 'Archive' : 'Publish'}
                </button>
                <button
                  onClick={() => setEditingMovie(movie)}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded text-sm transition-colors"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteMovie(movie.id)}
                  className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded text-sm transition-colors"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No movies found matching your search.</p>
        </div>
      )}

      {/* Add Movie Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Add New Movie</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={newMovie.title}
                  onChange={(e) => setNewMovie({...newMovie, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Movie title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Overview *</label>
                <textarea
                  value={newMovie.overview}
                  onChange={(e) => setNewMovie({...newMovie, overview: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Movie description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Release Date</label>
                <input
                  type="date"
                  value={newMovie.release_date}
                  onChange={(e) => setNewMovie({...newMovie, release_date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0-10)</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={newMovie.vote_average}
                  onChange={(e) => setNewMovie({...newMovie, vote_average: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMovie}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
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