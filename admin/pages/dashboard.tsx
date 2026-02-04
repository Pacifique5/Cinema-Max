import { useState, useEffect } from 'react'
import { 
  UsersIcon, 
  FilmIcon, 
  HeartIcon, 
  StarIcon,
  TrendingUpIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

// Simple interfaces for our data
interface SystemStats {
  total_users: number
  active_users: number
  total_movies: number
  total_favorites: number
  total_reviews: number
  new_users_today: number
  new_users_this_week: number
  new_users_this_month: number
}

interface UserActivity {
  id: string
  user_name: string
  user_email: string
  activity_type: string
  movie_title?: string
  created_at: string
}

// StatCard component defined properly
const StatCard = ({ title, value, change, icon: Icon, color }: {
  title: string
  value: string | number
  change?: string
  icon: any
  color: string
}) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`p-3 rounded-md ${color}`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">{value}</div>
                {change && (
                  <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                    <TrendingUpIcon className="h-4 w-4 flex-shrink-0 self-center" />
                    <span className="sr-only">Increased by</span>
                    {change}
                  </div>
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">{value}</div>
                {change && (
                  <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                    <TrendingUpIcon className="h-4 w-4 flex-shrink-0 self-center" />
                    <span className="sr-only">Increased by</span>
                    {change}
                  </div>
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
export default function Dashboard() {
  const [stats, setStats] = useState<SystemStats>({
    total_users: 1247,
    active_users: 892,
    total_movies: 856,
    total_favorites: 3421,
    total_reviews: 892,
    new_users_today: 23,
    new_users_this_week: 156,
    new_users_this_month: 445
  })
  
  const [activity, setActivity] = useState<UserActivity[]>([
    {
      id: '1',
      user_name: 'John Doe',
      user_email: 'john@example.com',
      activity_type: 'signup',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      user_name: 'Jane Smith',
      user_email: 'jane@example.com',
      activity_type: 'favorite',
      movie_title: 'The Dark Knight',
      created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString()
    }
  ])
  
  const [loading, setLoading] = useState(false)

  // Mock data loading
  useEffect(() => {
    // In a real app, you would fetch data from your API here
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome to CinemaMax Admin Panel. Here's what's happening with your app.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={stats.total_users.toLocaleString()}
          change={`+${stats.new_users_this_week} this week`}
          icon={UsersIcon}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Movies"
          value={stats.total_movies.toLocaleString()}
          icon={FilmIcon}
          color="bg-purple-500"
        />
        <StatCard
          title="Total Favorites"
          value={stats.total_favorites.toLocaleString()}
          icon={HeartIcon}
          color="bg-pink-500"
        />
        <StatCard
          title="Total Reviews"
          value={stats.total_reviews.toLocaleString()}
          icon={StarIcon}
          color="bg-yellow-500"
        />
      </div>

      {/* Growth Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5 text-center">
            <div className="text-3xl font-bold text-green-600">{stats.new_users_today}</div>
            <div className="text-sm text-gray-500">New Users Today</div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5 text-center">
            <div className="text-3xl font-bold text-blue-600">{stats.new_users_this_week}</div>
            <div className="text-sm text-gray-500">New Users This Week</div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5 text-center">
            <div className="text-3xl font-bold text-purple-600">{stats.new_users_this_month}</div>
            <div className="text-sm text-gray-500">New Users This Month</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {activity.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No recent activity</p>
          ) : (
            <div className="flow-root">
              <ul className="-mb-8">
                {activity.map((item, index) => (
                  <li key={item.id}>
                    <div className="relative pb-8">
                      {index !== activity.length - 1 && (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" />
                      )}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                            item.activity_type === 'signup' ? 'bg-green-500' :
                            item.activity_type === 'favorite' ? 'bg-pink-500' :
                            'bg-blue-500'
                          }`}>
                            {item.activity_type === 'signup' && <UsersIcon className="h-4 w-4 text-white" />}
                            {item.activity_type === 'favorite' && <HeartIcon className="h-4 w-4 text-white" />}
                            {item.activity_type === 'view' && <EyeIcon className="h-4 w-4 text-white" />}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              <span className="font-medium text-gray-900">{item.user_name}</span>
                              {item.activity_type === 'signup' && ' signed up'}
                              {item.activity_type === 'favorite' && ` added ${item.movie_title} to favorites`}
                              {item.activity_type === 'view' && ` viewed ${item.movie_title}`}
                            </p>
                            <p className="text-xs text-gray-400">{item.user_email}</p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            {new Date(item.created_at).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
  const [stats, setStats] = useState<SystemStats | null>(null)
  const [activity, setActivity] = useState<UserActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, activityData] = await Promise.all([
          getSystemStats(),
          getUserActivity(20)
        ])
        setStats(statsData)
        setActivity(activityData)
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card">
              <div className="card-body">
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome to CinemaMax Admin Panel. Here's what's happening with your app.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={stats?.total_users || 0}
          change={`+${stats?.new_users_this_week || 0} this week`}
          icon={UsersIcon}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Movies"
          value={stats?.total_movies || 0}
          icon={FilmIcon}
          color="bg-purple-500"
        />
        <StatCard
          title="Total Favorites"
          value={stats?.total_favorites || 0}
          icon={HeartIcon}
          color="bg-pink-500"
        />
        <StatCard
          title="Total Reviews"
          value={stats?.total_reviews || 0}
          icon={StarIcon}
          color="bg-yellow-500"
        />
      </div>

      {/* Growth Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-green-600">{stats?.new_users_today || 0}</div>
            <div className="text-sm text-gray-500">New Users Today</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-blue-600">{stats?.new_users_this_week || 0}</div>
            <div className="text-sm text-gray-500">New Users This Week</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-purple-600">{stats?.new_users_this_month || 0}</div>
            <div className="text-sm text-gray-500">New Users This Month</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="card-body">
          {activity.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No recent activity</p>
          ) : (
            <div className="flow-root">
              <ul className="-mb-8">
                {activity.map((item, index) => (
                  <li key={item.id}>
                    <div className="relative pb-8">
                      {index !== activity.length - 1 && (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" />
                      )}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                            item.activity_type === 'signup' ? 'bg-green-500' :
                            item.activity_type === 'favorite' ? 'bg-pink-500' :
                            'bg-blue-500'
                          }`}>
                            {item.activity_type === 'signup' && <UsersIcon className="h-4 w-4 text-white" />}
                            {item.activity_type === 'favorite' && <HeartIcon className="h-4 w-4 text-white" />}
                            {item.activity_type === 'view' && <EyeIcon className="h-4 w-4 text-white" />}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              <span className="font-medium text-gray-900">{item.user_name}</span>
                              {item.activity_type === 'signup' && ' signed up'}
                              {item.activity_type === 'favorite' && ` added ${item.movie_title} to favorites`}
                              {item.activity_type === 'view' && ` viewed ${item.movie_title}`}
                            </p>
                            <p className="text-xs text-gray-400">{item.user_email}</p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            {format(new Date(item.created_at), 'MMM d, HH:mm')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}