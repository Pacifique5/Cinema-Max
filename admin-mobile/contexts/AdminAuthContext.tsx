import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'

interface AdminUser {
  id: string
  username: string
  email: string
  role: 'admin' | 'super_admin'
  permissions: string[]
  avatar?: string
  lastLogin?: string
}

interface AdminAuthContextType {
  user: AdminUser | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  hasPermission: (permission: string) => boolean
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}

// Demo admin users
const DEMO_ADMIN_USERS = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    email: 'admin@cinemamax.com',
    role: 'super_admin' as const,
    permissions: ['users.read', 'users.write', 'users.delete', 'movies.read', 'movies.write', 'movies.delete', 'analytics.read', 'settings.write'],
    avatar: 'https://ui-avatars.com/api/?name=Admin&background=FF6B6B&color=fff&size=150'
  },
  {
    id: '2',
    username: 'moderator',
    password: 'mod123',
    email: 'moderator@cinemamax.com',
    role: 'admin' as const,
    permissions: ['users.read', 'users.write', 'movies.read', 'movies.write', 'analytics.read'],
    avatar: 'https://ui-avatars.com/api/?name=Moderator&background=3B82F6&color=fff&size=150'
  }
]

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadStoredUser()
  }, [])

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('adminUser')
      if (storedUser) {
        const userData = JSON.parse(storedUser)
        setUser(userData)
      }
    } catch (error) {
      console.error('Error loading stored admin user:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (username: string, password: string) => {
    try {
      // In production, this would be an API call
      const adminUser = DEMO_ADMIN_USERS.find(
        u => u.username === username && u.password === password
      )

      if (!adminUser) {
        return { success: false, error: 'Invalid username or password' }
      }

      const userSession: AdminUser = {
        id: adminUser.id,
        username: adminUser.username,
        email: adminUser.email,
        role: adminUser.role,
        permissions: adminUser.permissions,
        avatar: adminUser.avatar,
        lastLogin: new Date().toISOString()
      }

      setUser(userSession)
      await AsyncStorage.setItem('adminUser', JSON.stringify(userSession))
      
      // Store sensitive data in secure store
      await SecureStore.setItemAsync('adminToken', `token_${adminUser.id}`)
      
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' }
    }
  }

  const logout = async () => {
    try {
      setUser(null)
      await AsyncStorage.removeItem('adminUser')
      await SecureStore.deleteItemAsync('adminToken')
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  const hasPermission = (permission: string) => {
    if (!user) return false
    return user.permissions.includes(permission) || user.role === 'super_admin'
  }

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        hasPermission
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}