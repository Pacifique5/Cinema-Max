import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { OptimizedImage } from "../../components/OptimizedImage";
import { api } from "../../lib/api";

const { width } = Dimensions.get('window');

// Enhanced movie data with more details
const FEATURED_MOVIES = [
  {
    id: 1,
    title: "Avatar: The Way of Water",
    year: "2022",
    rating: "7.6",
    genre: "Sci-Fi",
    poster: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
    duration: "192 min",
    description: "Set more than a decade after the events of the first film..."
  },
  {
    id: 2,
    title: "Top Gun: Maverick",
    year: "2022", 
    rating: "8.3",
    genre: "Action",
    poster: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg",
    duration: "130 min",
    description: "After thirty years, Maverick is still pushing the envelope..."
  },
  {
    id: 3,
    title: "Black Panther: Wakanda Forever",
    year: "2022",
    rating: "6.7",
    genre: "Action",
    poster: "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/yYrvN5WFeGYjJnRzhY0QXuo4Isw.jpg",
    duration: "161 min",
    description: "Queen Ramonda, Shuri, M'Baku, Okoye and the Dora Milaje..."
  }
];

const TRENDING_MOVIES = [
  {
    id: 4,
    title: "The Batman",
    year: "2022",
    rating: "7.8",
    poster: "https://image.tmdb.org/t/p/w500/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg"
  },
  {
    id: 5,
    title: "Spider-Man: No Way Home",
    year: "2021",
    rating: "8.2",
    poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
  },
  {
    id: 6,
    title: "Dune",
    year: "2021",
    rating: "8.0",
    poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg"
  },
  {
    id: 7,
    title: "No Time to Die",
    year: "2021",
    rating: "7.3",
    poster: "https://image.tmdb.org/t/p/w500/iUgygt3fscRoKWCV1d0C7FbM9TP.jpg"
  }
];

const FeaturedMovieCard = ({ movie, index }: { movie: any, index: number }) => {
  const router = useRouter();
  
  // Handle both API and mock data formats
  const movieData = {
    id: movie.id,
    title: movie.title,
    year: movie.release_date ? new Date(movie.release_date).getFullYear().toString() : movie.year || '2023',
    rating: movie.vote_average ? movie.vote_average.toFixed(1) : movie.rating || '7.0',
    genre: movie.genres || movie.genre || 'Movie',
    backdrop: movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : movie.backdrop,
    duration: movie.runtime ? `${movie.runtime} min` : movie.duration || '120 min'
  };
  
  return (
    <TouchableOpacity 
      style={[styles.featuredCard, { marginLeft: index === 0 ? 20 : 0 }]}
      onPress={() => router.push(`/movie/${movieData.id}`)}
    >
      <OptimizedImage source={{ uri: movieData.backdrop }} style={styles.featuredImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.featuredGradient}
      >
        <View style={styles.featuredContent}>
          <Text style={styles.featuredTitle}>{movieData.title}</Text>
          <View style={styles.featuredMeta}>
            <Text style={styles.featuredYear}>{movieData.year}</Text>
            <Text style={styles.featuredDot}>•</Text>
            <Text style={styles.featuredGenre}>{Array.isArray(movieData.genre) ? movieData.genre[0] : movieData.genre}</Text>
            <Text style={styles.featuredDot}>•</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={12} color="#FFD700" />
              <Text style={styles.featuredRating}>{movieData.rating}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.playButton}>
            <Ionicons name="play" size={16} color="#FFFFFF" />
            <Text style={styles.playButtonText}>Watch Trailer</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const TrendingMovieCard = ({ movie }: { movie: any }) => {
  const router = useRouter();
  
  // Handle both API and mock data formats
  const movieData = {
    id: movie.id,
    title: movie.title,
    year: movie.release_date ? new Date(movie.release_date).getFullYear().toString() : movie.year || '2023',
    rating: movie.vote_average ? movie.vote_average.toFixed(1) : movie.rating || '7.0',
    poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : movie.poster
  };
  
  return (
    <TouchableOpacity 
      style={styles.trendingCard}
      onPress={() => router.push(`/movie/${movieData.id}`)}
    >
      <OptimizedImage source={{ uri: movieData.poster }} style={styles.trendingImage} />
      <View style={styles.trendingContent}>
        <Text style={styles.trendingTitle} numberOfLines={2}>{movieData.title}</Text>
        <Text style={styles.trendingYear}>{movieData.year}</Text>
        <View style={styles.trendingRating}>
          <Ionicons name="star" size={12} color="#FFD700" />
          <Text style={styles.trendingRatingText}>{movieData.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const router = useRouter();
  const { user, isGuest } = useAuth();
  const [activeCategory, setActiveCategory] = useState('All');
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const categories = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'];

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      
      // Load popular movies for featured section
      const popularResponse = await api.getPopularMovies(1);
      if (popularResponse.results) {
        setFeaturedMovies(popularResponse.results.slice(0, 3));
      }
      
      // Load trending movies
      const trendingResponse = await api.getTrendingMovies('week');
      if (trendingResponse.results) {
        setTrendingMovies(trendingResponse.results.slice(0, 6));
      }
      
    } catch (error) {
      console.error('Error loading movies:', error);
      // Fallback to mock data if API fails
      setFeaturedMovies(FEATURED_MOVIES);
      setTrendingMovies(TRENDING_MOVIES);
    } finally {
      setLoading(false);
    }
  };

  const getGreeting = () => {
    if (isGuest) {
      return "Welcome, Guest! 👋";
    }
    if (user) {
      const firstName = user.first_name; // Get first name from user object
      return `Hello, ${firstName}! 👋`;
    }
    return "Hello, Movie Lover! 👋";
  };

  const getSubtitle = () => {
    if (isGuest) {
      return "Discover amazing movies";
    }
    return "What do you want to watch today?";
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1a1a2e', '#16213e']} style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.subtitle}>{getSubtitle()}</Text>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => router.push('/(tabs)/profile')}
          >
            {user?.email ? (
              <Image source={{ uri: `https://ui-avatars.com/api/?name=${encodeURIComponent((user?.first_name || '') + ' ' + (user?.last_name || ''))}&background=FF6B6B&color=fff&size=64` }} style={styles.profileImage} />
            ) : (
              <Ionicons name="person-circle" size={32} color="#FF6B6B" />
            )}
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={() => router.push('/(tabs)/search')}
        >
          <Ionicons name="search" size={20} color="#CCCCCC" />
          <Text style={styles.searchText}>Search movies...</Text>
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Featured Movies */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Movies</Text>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading movies...</Text>
            </View>
          ) : (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={featuredMovies}
              renderItem={({ item, index }) => <FeaturedMovieCard movie={item} index={index} />}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.featuredList}
            />
          )}
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  activeCategory === category && styles.activeCategoryButton
                ]}
                onPress={() => setActiveCategory(category)}
              >
                <Text style={[
                  styles.categoryText,
                  activeCategory === category && styles.activeCategoryText
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Trending Movies */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Now</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading trending...</Text>
            </View>
          ) : (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={trendingMovies}
              renderItem={({ item }) => <TrendingMovieCard movie={item} />}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.trendingList}
            />
          )}
        </View>

        {/* Continue Watching */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Continue Watching</Text>
          <View style={styles.continueWatchingCard}>
            <Image 
              source={{ uri: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg" }}
              style={styles.continueWatchingImage}
            />
            <View style={styles.continueWatchingContent}>
              <Text style={styles.continueWatchingTitle}>Top Gun: Maverick</Text>
              <Text style={styles.continueWatchingProgress}>45 min left</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '65%' }]} />
              </View>
            </View>
            <TouchableOpacity style={styles.continuePlayButton}>
              <Ionicons name="play" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#CCCCCC',
    marginTop: 4,
  },
  profileButton: {
    padding: 4,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 12,
  },
  searchText: {
    color: '#CCCCCC',
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  seeAllText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '600',
  },
  featuredList: {
    paddingRight: 20,
  },
  featuredCard: {
    width: width * 0.8,
    height: 200,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
  },
  featuredContent: {
    padding: 16,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featuredYear: {
    color: '#CCCCCC',
    fontSize: 12,
  },
  featuredDot: {
    color: '#CCCCCC',
    marginHorizontal: 6,
  },
  featuredGenre: {
    color: '#CCCCCC',
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featuredRating: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    gap: 6,
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginRight: 12,
  },
  activeCategoryButton: {
    backgroundColor: '#FF6B6B',
  },
  categoryText: {
    color: '#CCCCCC',
    fontSize: 14,
    fontWeight: '500',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  trendingList: {
    paddingHorizontal: 20,
  },
  trendingCard: {
    width: 120,
    marginRight: 16,
  },
  trendingImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  trendingContent: {
    gap: 4,
  },
  trendingTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  trendingYear: {
    color: '#CCCCCC',
    fontSize: 12,
  },
  trendingRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendingRatingText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
  },
  continueWatchingCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  continueWatchingImage: {
    width: 60,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  continueWatchingContent: {
    flex: 1,
  },
  continueWatchingTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  continueWatchingProgress: {
    color: '#CCCCCC',
    fontSize: 12,
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B6B',
    borderRadius: 2,
  },
  continuePlayButton: {
    backgroundColor: '#FF6B6B',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  loadingText: {
    color: '#CCCCCC',
    fontSize: 16,
  },
});