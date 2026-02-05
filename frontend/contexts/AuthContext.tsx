import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, User } from '../lib/api';

interface AuthContextType {
  user: User | null;
  isGuest: boolean;
  isLoading: boolean;
  token: string | null;
  signUp: (email: string, password: string, name: string, username: string) => Promise<{ success: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  continueAsGuest: () => void;
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  addToFavorites: (movieId: string) => Promise<{ success: boolean; error?: string }>;
  removeFromFavorites: (movieId: string) => Promise<{ success: boolean; error?: string }>;
  getFavorites: () => Promise<string[]>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      const storedUser = await AsyncStorage.getItem('userData');
      const guestMode = await AsyncStorage.getItem('isGuest');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        
        // Verify token is still valid
        try {
          const response = await api.getCurrentUser(storedToken);
          if (response.user) {
            setUser(response.user);
          } else {
            // Token invalid, clear stored data
            await clearStoredAuth();
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          await clearStoredAuth();
        }
      } else if (guestMode === 'true') {
        setIsGuest(true);
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearStoredAuth = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');
    await AsyncStorage.removeItem('isGuest');
    setUser(null);
    setToken(null);
    setIsGuest(false);
  };

  const signUp = async (email: string, password: string, name: string, username: string) => {
    try {
      const response = await api.signUp(email, password, name, username);
      
      if (response.user && response.token) {
        setUser(response.user);
        setToken(response.token);
        await AsyncStorage.setItem('userToken', response.token);
        await AsyncStorage.setItem('userData', JSON.stringify(response.user));
        return { success: true };
      } else {
        return { success: false, error: response.error || 'Sign up failed' };
      }
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: 'Network error. Please check your connection.' };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.signIn(email, password);
      
      if (response.user && response.token) {
        setUser(response.user);
        setToken(response.token);
        setIsGuest(false);
        await AsyncStorage.setItem('userToken', response.token);
        await AsyncStorage.setItem('userData', JSON.stringify(response.user));
        await AsyncStorage.removeItem('isGuest');
        return { success: true };
      } else {
        return { success: false, error: response.error || 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: 'Network error. Please check your connection.' };
    }
  };

  const signOut = async () => {
    try {
      if (token) {
        await api.signOut(token);
      }
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      await clearStoredAuth();
    }
  };

  const continueAsGuest = async () => {
    setIsGuest(true);
    setUser(null);
    setToken(null);
    await AsyncStorage.setItem('isGuest', 'true');
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!token) {
      return { success: false, error: 'No user logged in' };
    }

    try {
      const response = await api.updateProfile(token, updates);
      
      if (response.id) {
        const updatedUser = { ...user, ...response };
        setUser(updatedUser);
        await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
        return { success: true };
      } else {
        return { success: false, error: response.error || 'Update failed' };
      }
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const addToFavorites = async (movieId: string) => {
    if (!token) {
      return { success: false, error: 'Please sign in to add favorites' };
    }

    try {
      const response = await api.addToFavorites(token, movieId);
      return { success: !!response.message };
    } catch (error) {
      console.error('Add favorite error:', error);
      return { success: false, error: 'Failed to add favorite' };
    }
  };

  const removeFromFavorites = async (movieId: string) => {
    if (!token) {
      return { success: false, error: 'Please sign in to manage favorites' };
    }

    try {
      const response = await api.removeFromFavorites(token, movieId);
      return { success: !!response.message };
    } catch (error) {
      console.error('Remove favorite error:', error);
      return { success: false, error: 'Failed to remove favorite' };
    }
  };

  const getFavorites = async (): Promise<string[]> => {
    if (!token) {
      return [];
    }

    try {
      const favorites = await api.getFavorites(token);
      return favorites.map((fav: any) => fav.movie_id.toString());
    } catch (error) {
      console.error('Get favorites error:', error);
      return [];
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isGuest,
        isLoading,
        token,
        signUp,
        signIn,
        signOut,
        continueAsGuest,
        updateProfile,
        addToFavorites,
        removeFromFavorites,
        getFavorites,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};