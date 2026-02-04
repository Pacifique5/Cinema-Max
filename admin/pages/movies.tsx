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
  genre_ids: number[]
  runtime?: number
  status: 'active' | 'inactive'
  created_at: string
}

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null)
  const [newMovie, setNewMovie] = useState({
    title: '',
    overview: '',
    poster_path: '',
    backdrop_path: '',
    release_date: '',
    vote_average: 0,
    runtime: 0,
    genre_ids: [] as number[]
  })

  // Mock data - replace with API calls
  useEffect(() => {
    const mockMovies: Movie[] = [
      {
        id: '1',
        title: 'The Dark Knight',
        overview: 'Batman raises the stakes in his war on crime...',
        poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
        backdrop_path: '/hqkIcbrOHL86UncnHIsHVcVmzue.jpg',
        release_date: '2008-07-18',
        vote_average: 9.0,
        vote_count: 28000,
        genre_ids: [28, 80, 18],
        runtime: 152,
        status: 'active',
        created_at: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        title: 'Inception',
        overview: 'A thief who steals corporate secrets through dream-sharing technology...',
        poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
        backdrop_path: '/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
        release_date: '2010-07-16',
        vote_average: 8.8,
        vote_count: 32000,
        genre_ids: [28, 878, 53],
        runtime: 148,
        status: 'active',
        created_at: '2024-01-14T09:15:00Z'
      }
    ]
    
    setTimeout(() => {
      setMovies(mockMovies)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.overview.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddMovie = () => {
    if (!newMovie.title || !newMovie.overview) {
      toast.error('Please fill in required fields')
      return
    }

    const movie: Movie = {
      id: Date.now().toString(),
      ...newMovie,
      vote_count: 0,
      status: 'active',
      created_at: new Date().toISOString()
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

  const toggleMovieStatus = (id: string) => {
    setMovies(movies.map(movie => 
      movie.id === id 
        ? { ...movie, status: movie.status === 'active' ? 'inactive' : 'active' }
        : movie
    ))
    toast.success('Movie status updated!')
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
                  {movie.status === 'active' ? 'Hide' : 'Show'}
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