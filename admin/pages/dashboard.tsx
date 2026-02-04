import { useState, useEffect } from 'react'
import { 
  UsersIcon, 
  FilmIcon, 
  HeartIcon, 
  StarIcon,
  ArrowTrendingUpIcon,
  EyeIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { useAdminAuth } from '@/contexts/AdminAuthContext'

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  trend?: 'up' | 'down' | 'neutral'
}

interface SystemAlert {
  id: string
  type: 'warning' | 'error' | 'info'
  message: string
  timestamp: string
}

interface RecentActivity {
  id: string
  user_id: string
  user_name: string
  user_email: string
  activity_type: 'signup' | 'favorite' | 'view' | 'review' | 'subscription'
  movie_id?: string
  movie_title?: string
  created_at: string
  details?: string
}

function StatCard({ title, value, change, icon: Icon, color, trend }: StatCardProps) {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="card-body">
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
                  <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                    trend === 'up' ? 'text-green-600' : 
                    trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    <ArrowTrendingUpIcon className={`h-4 w-4 flex-shrink-0 self-center ${
                      trend === 'down' ? 'rotate-180' : ''
                    }`} />
                    <span className="sr-only">
                      {trend === 'up' ? 'Increased' : trend === 'down' ? 'Decreased' : 'Changed'} by
                    </span>
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

export default function Dashboard() {
  const { user } = useAdminAuth()
  const [stats, setStats] = useState({
    total_users: 1247,
    active_users: 892,
    total_movies: 856,
    total_favorites: 3421,
    total_reviews: 892,
    new_users_today: 23,
    new_users_this_week: 156,
    new_users_this_month: 634,
    revenue_today: 3650,
    revenue_month: 89420,
    premium_users: 180,
    server_uptime: 99.8
  })
  
  const [activity, setActivity] = useState<RecentActivity[]>([])
  const [alerts, setAlerts] = useState<SystemAlert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        active_users: prev.active_users + Math.floor(Math.random() * 5) - 2,
        new_users_today: prev.new_users_today + (Math.random() > 0.8 ? 1 : 0),
        revenue_today: prev.revenue_today + Math.floor(Math.random() * 100)
      }))
    }, 5000)

    // Load initial data
    setTimeout(() => {
      setActivity([
        {
          id: '1',
          user_id: '1',
          user_name: 'John Doe',
          user_email: 'john@example.com',
          activity_type: 'subscription',
          created_at: new Date().toISOString(),
          details: 'Upgraded to Premium'
        },
        {
          id: '2',
          user_id: '2',
          user_name: 'Jane Smith',
          user_email: 'jane@example.com',
          activity_type: 'favorite',
          movie_id: '550',
          movie_title: 'Fight Club',
          created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString()
        },
        {
          id: '3',
          user_id: '3',
          user_name: 'Mike Johnson',
          user_email: 'mike@example.com',
          activity_type: 'review',
          movie_id: '155',
          movie_title: 'The Dark Knight',
          created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          details: 'Rated 5 stars'
        },
        {
          id: '4',
          user_id: '4',
          user_name: 'Sarah Wilson',
          user_email: 'sarah@example.com',
          activity_type: 'signup',
          created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString()
        },
        {
          id: '5',
          user_id: '5',
          user_name: 'Alex Brown',
          user_email: 'alex@example.com',
          activity_type: 'view',
          movie_id: '278',
          movie_title: 'The Shawshank Redemption',
          created_at: new Date(Date.now() - 60 * 60 * 1000).toISOString()
        }
      ])

      setAlerts([
        {
          id: '1',
          type: 'warning',
          message: 'Server CPU usage is at 85%. Consider scaling up.',
          timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          type: 'info',
          message: 'New movie "Dune: Part Two" has been added to the catalog.',
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString()
        }
      ])

      setLoading(false)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'signup':
        return <UsersIcon className="h-4 w-4 text-white" />
      case 'favorite':
        return <HeartIcon className="h-4 w-4 text-white" />
      case 'view':
        return <EyeIcon className="h-4 w-4 text-white" />
      case 'review':
        return <StarIcon className="h-4 w-4 text-white" />
      case 'subscription':
        return <CurrencyDollarIcon className="h-4 w-4 text-white" />
      default:
        return <ClockIcon className="h-4 w-4 text-white" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'signup':
        return 'bg-green-500'
      case 'favorite':
        return 'bg-pink-500'
      case 'view':
        return 'bg-blue-500'
      case 'review':
        return 'bg-yellow-500'
      case 'subscription':
        return 'bg-purple-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
      default:
        return <ExclamationTriangleIcon className="h-5 w-5 text-blue-500" />
    }
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
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.username}!</h1>
            <p className="mt-1 text-blue-100">
              Here's what's happening with CinemaMax today
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-100">Server Status</div>
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span className="text-sm font-medium">{stats.server_uptime}% Uptime</span>
            </div>
          </div>
        </div>
      </div>

      {/* System Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((alert) => (
            <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
              alert.type === 'error' ? 'bg-red-50 border-red-400' :
              alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
              'bg-blue-50 border-blue-400'
            }`}>
              <div className="flex items-center">
                {getAlertIcon(alert.type)}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={stats.total_users.toLocaleString()}
          change={`+${stats.new_users_this_week} this week`}
          icon={UsersIcon}
          color="bg-blue-500"
          trend="up"
        />
        <StatCard
          title="Active Now"
          value={stats.active_users.toLocaleString()}
          change="+5.2%"
          icon={EyeIcon}
          color="bg-green-500"
          trend="up"
        />
        <StatCard
          title="Total Movies"
          value={stats.total_movies.toLocaleString()}
          change="+12 this month"
          icon={FilmIcon}
          color="bg-purple-500"
          trend="up"
        />
        <StatCard
          title="Premium Users"
          value={stats.premium_users.toLocaleString()}
          change="+15.3%"
          icon={CurrencyDollarIcon}
          color="bg-indigo-500"
          trend="up"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Favorites"
          value={stats.total_favorites.toLocaleString()}
          change="+8.1%"
          icon={HeartIcon}
          color="bg-pink-500"
          trend="up"
        />
        <StatCard
          title="Total Reviews"
          value={stats.total_reviews.toLocaleString()}
          change="+12.4%"
          icon={StarIcon}
          color="bg-yellow-500"
          trend="up"
        />
        <StatCard
          title="Revenue Today"
          value={`$${stats.revenue_today.toLocaleString()}`}
          change="+22.1%"
          icon={ChartBarIcon}
          color="bg-emerald-500"
          trend="up"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${stats.revenue_month.toLocaleString()}`}
          change="+18.7%"
          icon={CurrencyDollarIcon}
          color="bg-orange-500"
          trend="up"
        />
      </div>

      {/* Growth Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-green-600">{stats.new_users_today}</div>
            <div className="text-sm text-gray-500">New Users Today</div>
            <div className="mt-2 text-xs text-gray-400">
              Target: 25 users
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-blue-600">{stats.new_users_this_week}</div>
            <div className="text-sm text-gray-500">New Users This Week</div>
            <div className="mt-2 text-xs text-gray-400">
              Target: 150 users
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-purple-600">{stats.new_users_this_month}</div>
            <div className="text-sm text-gray-500">New Users This Month</div>
            <div className="mt-2 text-xs text-gray-400">
              Target: 600 users
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="card-header flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          <span className="text-sm text-gray-500">Live updates</span>
        </div>
        <div className="card-body">
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
                        <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getActivityColor(item.activity_type)}`}>
                          {getActivityIcon(item.activity_type)}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium text-gray-900">{item.user_name}</span>
                            {item.activity_type === 'signup' && ' signed up'}
                            {item.activity_type === 'favorite' && ` added ${item.movie_title} to favorites`}
                            {item.activity_type === 'view' && ` viewed ${item.movie_title}`}
                            {item.activity_type === 'review' && ` reviewed ${item.movie_title}`}
                            {item.activity_type === 'subscription' && ` ${item.details}`}
                          </p>
                          <p className="text-xs text-gray-400">{item.user_email}</p>
                          {item.details && item.activity_type === 'review' && (
                            <p className="text-xs text-blue-600 mt-1">{item.details}</p>
                          )}
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          <div>{new Date(item.created_at).toLocaleTimeString()}</div>
                          <div className="text-xs">
                            {new Date(item.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}