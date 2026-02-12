'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { 
  FilmIcon, 
  MagnifyingGlassIcon, 
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  HomeIcon,
  HeartIcon,
  CameraIcon
} from '@heroicons/react/24/outline'
import { useState, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'

export default function Navbar() {
  const { user, isGuest, logout } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [showImageModal, setShowImageModal] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (user && !isGuest) {
      fetchProfileImage()
    }
  }, [user, isGuest])

  const fetchProfileImage = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        if (data.profile_image) {
          setProfileImage(data.profile_image)
        }
      }
    } catch (error) {
      console.error('Error fetching profile image:', error)
    }
  }

  const getInitials = () => {
    if (!user) return '?'
    const firstInitial = user.first_name?.[0] || ''
    const lastInitial = user.last_name?.[0] || ''
    return (firstInitial + lastInitial).toUpperCase() || user.username?.[0]?.toUpperCase() || '?'
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB')
        return
      }

      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file')
        return
      }

      setUploadingImage(true)
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setImagePreview(base64String)
        setUploadingImage(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveImage = async () => {
    if (imagePreview) {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ profile_image: imagePreview })
        })

        if (response.ok) {
          setProfileImage(imagePreview)
          setImagePreview(null)
          setShowImageModal(false)
          toast.success('Profile picture updated!')
        } else {
          toast.error('Failed to update profile picture')
        }
      } catch (error) {
        console.error('Error updating profile picture:', error)
        toast.error('Failed to update profile picture')
      }
    }
  }

  const handleRemoveImage = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ profile_image: null })
      })

      if (response.ok) {
        setProfileImage(null)
        setImagePreview(null)
        setShowImageModal(false)
        toast.success('Profile picture removed')
      } else {
        toast.error('Failed to remove profile picture')
      }
    } catch (error) {
      console.error('Error removing profile picture:', error)
      toast.error('Failed to remove profile picture')
    }
  }

  return (
    <>
      <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/home" className="flex items-center space-x-2">
              <FilmIcon className="h-8 w-8 text-red-500" />
              <span className="text-xl font-bold text-white">CinemaMax</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/home" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
                <HomeIcon className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link href="/search" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
                <MagnifyingGlassIcon className="h-5 w-5" />
                <span>Search</span>
              </Link>
              {!isGuest && (
                <Link href="/favorites" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
                  <HeartIcon className="h-5 w-5" />
                  <span>Favorites</span>
                </Link>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              {isGuest ? (
                <Link href="/auth/login" className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
                  Sign In
                </Link>
              ) : user ? (
                <div>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-2 text-white hover:opacity-80 transition-opacity"
                    title="Click to view menu"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-800 border-2 border-red-500 flex items-center justify-center">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold text-sm">
                          {getInitials()}
                        </span>
                      )}
                    </div>
                    <span className="hidden md:block font-semibold">{user.first_name}</span>
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-2xl py-2 border border-gray-700">
                      <div className="px-4 py-3 border-b border-gray-700">
                        <p className="text-white font-semibold">{user.first_name} {user.last_name}</p>
                        <p className="text-gray-400 text-sm">@{user.username}</p>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        <UserCircleIcon className="h-5 w-5 mr-3" />
                        <span>Profile</span>
                      </Link>
                      <hr className="border-gray-700 my-2" />
                      <button
                        onClick={() => {
                          setShowDropdown(false)
                          logout()
                        }}
                        className="flex items-center w-full text-left px-4 py-3 text-red-400 hover:bg-gray-700 transition-colors"
                      >
                        <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/auth/login" className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Picture Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowImageModal(false)}>
          <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-white mb-6">Update Profile Picture</h2>
            
            {/* Current/Preview Image */}
            <div className="flex justify-center mb-6">
              <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-900 border-4 border-red-500 flex items-center justify-center">
                {imagePreview || profileImage ? (
                  <img
                    src={imagePreview || profileImage || ''}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-6xl font-bold text-white">
                    {getInitials()}
                  </span>
                )}
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            {/* Action Buttons */}
            <div className="space-y-3">
              {imagePreview ? (
                <>
                  <button
                    onClick={handleSaveImage}
                    disabled={uploadingImage}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
                  >
                    Save New Picture
                  </button>
                  <button
                    onClick={() => {
                      setImagePreview(null)
                      if (fileInputRef.current) fileInputRef.current.value = ''
                    }}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleImageClick}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <CameraIcon className="h-5 w-5" />
                    <span>Choose Photo</span>
                  </button>
                  {profileImage && (
                    <button
                      onClick={handleRemoveImage}
                      className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition-colors"
                    >
                      Remove Current Picture
                    </button>
                  )}
                  <button
                    onClick={() => setShowImageModal(false)}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </>
              )}
            </div>

            <p className="text-gray-400 text-sm text-center mt-4">
              Max file size: 5MB • Formats: JPG, PNG, GIF
            </p>
          </div>
        </div>
      )}
    </>
  )
}
