import React, { useState } from 'react'
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function AddMovie() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [movie, setMovie] = useState({
    title: '',
    overview: '',
    release_date: '',
    runtime: '',
    vote_average: '',
    poster_path: '',
    backdrop_path: '',
    genres: '',
    director: '',
    cast: ''
  })

  const handleSave = async () => {
    if (!movie.title || !movie.overview) {
      Alert.alert('Error', 'Please fill in the required fields (Title and Overview)')
      return
    }

    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      Alert.alert(
        'Success', 
        'Movie added successfully!',
        [{ text: 'OK', onPress: () => router.back() }]
      )
      setLoading(false)
    }, 1500)
  }

  const handleCancel = () => {
    Alert.alert(
      'Cancel',
      'Are you sure you want to cancel? All changes will be lost.',
      [
        { text: 'Continue Editing', style: 'cancel' },
        { text: 'Cancel', style: 'destructive', onPress: () => router.back() }
      ]
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white border-b border-gray-200 px-4 py-3">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={handleCancel} className="p-2">
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-900">Add Movie</Text>
          <TouchableOpacity 
            onPress={handleSave}
            disabled={loading}
            className={`px-4 py-2 rounded-lg ${loading ? 'bg-gray-300' : 'bg-blue-600'}`}
          >
            <Text className={`text-sm font-medium ${loading ? 'text-gray-500' : 'text-white'}`}>
              {loading ? 'Saving...' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-4 py-6">
          {/* Basic Information */}
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <Text className="text-lg font-semibold text-gray-900 mb-4">Basic Information</Text>
            
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">Title *</Text>
              <TextInput
                value={movie.title}
                onChangeText={(text) => setMovie({...movie, title: text})}
                placeholder="Enter movie title"
                className="border border-gray-300 rounded-lg px-3 py-3 text-gray-900"
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">Overview *</Text>
              <TextInput
                value={movie.overview}
                onChangeText={(text) => setMovie({...movie, overview: text})}
                placeholder="Enter movie description"
                multiline
                numberOfLines={4}
                className="border border-gray-300 rounded-lg px-3 py-3 text-gray-900 h-24"
                textAlignVertical="top"
              />
            </View>

            <View className="flex-row space-x-3 mb-4">
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-700 mb-2">Release Date</Text>
                <TextInput
                  value={movie.release_date}
                  onChangeText={(text) => setMovie({...movie, release_date: text})}
                  placeholder="YYYY-MM-DD"
                  className="border border-gray-300 rounded-lg px-3 py-3 text-gray-900"
                />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-700 mb-2">Runtime (min)</Text>
                <TextInput
                  value={movie.runtime}
                  onChangeText={(text) => setMovie({...movie, runtime: text})}
                  placeholder="120"
                  keyboardType="numeric"
                  className="border border-gray-300 rounded-lg px-3 py-3 text-gray-900"
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">Rating (0-10)</Text>
              <TextInput
                value={movie.vote_average}
                onChangeText={(text) => setMovie({...movie, vote_average: text})}
                placeholder="8.5"
                keyboardType="decimal-pad"
                className="border border-gray-300 rounded-lg px-3 py-3 text-gray-900"
              />
            </View>
          </View>

          {/* Media */}
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <Text className="text-lg font-semibold text-gray-900 mb-4">Media</Text>
            
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">Poster URL</Text>
              <TextInput
                value={movie.poster_path}
                onChangeText={(text) => setMovie({...movie, poster_path: text})}
                placeholder="https://image.tmdb.org/t/p/w500/..."
                className="border border-gray-300 rounded-lg px-3 py-3 text-gray-900"
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">Backdrop URL</Text>
              <TextInput
                value={movie.backdrop_path}
                onChangeText={(text) => setMovie({...movie, backdrop_path: text})}
                placeholder="https://image.tmdb.org/t/p/w1280/..."
                className="border border-gray-300 rounded-lg px-3 py-3 text-gray-900"
              />
            </View>
          </View>

          {/* Additional Details */}
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <Text className="text-lg font-semibold text-gray-900 mb-4">Additional Details</Text>
            
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">Genres</Text>
              <TextInput
                value={movie.genres}
                onChangeText={(text) => setMovie({...movie, genres: text})}
                placeholder="Action, Drama, Thriller"
                className="border border-gray-300 rounded-lg px-3 py-3 text-gray-900"
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">Director</Text>
              <TextInput
                value={movie.director}
                onChangeText={(text) => setMovie({...movie, director: text})}
                placeholder="Christopher Nolan"
                className="border border-gray-300 rounded-lg px-3 py-3 text-gray-900"
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">Main Cast</Text>
              <TextInput
                value={movie.cast}
                onChangeText={(text) => setMovie({...movie, cast: text})}
                placeholder="Leonardo DiCaprio, Marion Cotillard, Tom Hardy"
                multiline
                numberOfLines={3}
                className="border border-gray-300 rounded-lg px-3 py-3 text-gray-900 h-20"
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row space-x-3 mb-8">
            <TouchableOpacity 
              onPress={handleCancel}
              className="flex-1 bg-gray-100 py-4 rounded-xl"
            >
              <Text className="text-center text-gray-700 font-medium">Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={handleSave}
              disabled={loading}
              className={`flex-1 py-4 rounded-xl ${loading ? 'bg-gray-300' : 'bg-blue-600'}`}
            >
              <Text className={`text-center font-medium ${loading ? 'text-gray-500' : 'text-white'}`}>
                {loading ? 'Adding Movie...' : 'Add Movie'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}