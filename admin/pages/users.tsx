import { useState, useEffect } from 'react'
import { 
  MagnifyingGlassIcon, 
  UserPlusIcon, 
  PencilIcon, 
  TrashIcon,
  EyeIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'user' | 'premium' | 'admin'
  status: 'active' | 'suspended' | 'banned'
  created_at: string
  last_login?: string
  total_favorites: number
  total_reviews: number
  subscription_status?: 'free' | 'premium' | 'expired'
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [showUserModal, setShowUserModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  // Mock data - replace with API calls
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=3B82F6&color=fff',
        role: 'premium',
        status: 'active',
        created_at: '2024-01-15T10:30:00Z',
        last_login: '2024-02-01T14:22:00Z',
        total_favorites: 25,
        total_reviews: 12,
        subscription_status: 'premium'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=EF4444&color=fff',
        role: 'user',
        status: 'active',
        created_at: '2024-01-20T09:15:00Z',
        last_login: '2024-02-03T11:45:00Z',
        total_favorites: 8,
        total_reviews: 3,
        subscription_status: 'free'
      },
      {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=10B981&color=fff',
        role: 'admin',
        status: 'active',
        created_at: '2024-01-10T16:20:00Z',
        last_login: '2024-02-04T08:30:00Z',
        total_favorites: 45,
        total_reviews: 28,
        subscription_status: 'premium'
      },
      {
        id: '4',
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        role: 'user',
        status: 'suspended',
        created_at: '2024-01-25T12:10:00Z',
        last_login: '2024-01-30T19:15:00Z',
        total_favorites: 2,
        total_reviews: 0,
        subscription_status: 'free'
      }
    ]
    
    setTimeout(() => {
      setUsers(mockUsers)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleStatusChange = (userId: string, newStatus: User['status']) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ))
    toast.success(`User status updated to ${newStatus}`)
  }

  const handleRoleChange = (userId: string, newRole: User['role']) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ))
    toast.success(`User role updated to ${newRole}`)
  }

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(users.filter(user => user.id !== userId))
      toast.success('User deleted successfully')
    }
  }

  const handleBulkAction = (action: string) => {
    if (selectedUsers.length === 0) {
      toast.error('Please select users first')
      return
    }

    switch (action) {
      case 'activate':
        setUsers(users.map(user => 
          selectedUsers.includes(user.id) ? { ...user, status: 'active' } : user
        ))
        toast.success(`${selectedUsers.length} users activated`)
        break
      case 'suspend':
        setUsers(users.map(user => 
          selectedUsers.includes(user.id) ? { ...user, status: 'suspended' } : user
        ))
        toast.success(`${selectedUsers.length} users suspended`)
        break
      case 'delete':
        if (confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) {
          setUsers(users.filter(user => !selectedUsers.includes(user.id)))
          toast.success(`${selectedUsers.length} users deleted`)
        }
        break
    }
    setSelectedUsers([])
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <ShieldCheckIcon className="h-4 w-4 text-red-500" />
      case 'premium':
        return <ShieldExclamationIcon className="h-4 w-4 text-yellow-500" />
      default:
        return <EyeIcon className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800'
      case 'banned':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage all users in your CinemaMax app ({users.length} total)
          </p>
        </div>
        <button
          onClick={() => setShowUserModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <UserPlusIcon className="h-5 w-5" />
          <span>Add User</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Roles</option>
          <option value="user">User</option>
          <option value="premium">Premium</option>
          <option value="admin">Admin</option>
        </select>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="banned">Banned</option>
        </select>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700">
              {selectedUsers.length} user(s) selected
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleBulkAction('activate')}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                Activate
              </button>
              <button
                onClick={() => handleBulkAction('suspend')}
                className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700"
              >
                Suspend
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(filteredUsers.map(u => u.id))
                      } else {
                        setSelectedUsers([])
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers([...selectedUsers, user.id])
                        } else {
                          setSelectedUsers(selectedUsers.filter(id => id !== user.id))
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {user.avatar ? (
                          <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(user.role)}
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value as User['role'])}
                        className="text-sm border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="user">User</option>
                        <option value="premium">Premium</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={user.status}
                      onChange={(e) => handleStatusChange(user.id, e.target.value as User['status'])}
                      className={`text-sm px-2 py-1 rounded-full border-0 ${getStatusColor(user.status)}`}
                    >
                      <option value="active">Active</option>
                      <option value="suspended">Suspended</option>
                      <option value="banned">Banned</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div>
                      <div>{user.total_favorites} favorites</div>
                      <div>{user.total_reviews} reviews</div>
                      <div className="text-xs">
                        Joined {new Date(user.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingUser(user)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No users found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}