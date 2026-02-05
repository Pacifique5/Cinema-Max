import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { api } from "../../lib/api";

// Same sample data for search
const SAMPLE_MOVIES = [
  {
    id: 1,
    title: "The Dark Knight",
    year: "2008",
    rating: "9.0",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
  },
  {
    id: 2,
    title: "Inception",
    year: "2010", 
    rating: "8.8",
    poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
  },
  {
    id: 3,
    title: "Interstellar",
    year: "2014",
    rating: "8.6", 
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
  },
  {
    id: 4,
    title: "The Matrix",
    year: "1999",
    rating: "8.7",
    poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
  },
  {
    id: 5,
    title: "Pulp Fiction", 
    year: "1994",
    rating: "8.9",
    poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg"
  },
  {
    id: 6,
    title: "Fight Club",
    year: "1999", 
    rating: "8.8",
    poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg"
  }
];

const MovieCard = ({ movie }: { movie: any }) => {
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
      style={styles.movieCard}
      onPress={() => router.push(`/movie/${movieData.id}`)}
    >
      <Image source={{ uri: movieData.poster }} style={styles.poster} />
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle} numberOfLines={1}>{movieData.title}</Text>
        <Text style={styles.movieYear}>{movieData.year}</Text>
        <Text style={styles.movieRating}>⭐ {movieData.rating}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    try {
      setLoading(true);
      const response = await api.getPopularMovies(1);
      if (response.results) {
        setMovies(response.results.slice(0, 10));
      }
    } catch (error) {
      console.error('Error loading popular movies:', error);
      // Fallback to sample data
      setMovies(SAMPLE_MOVIES);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (text: string) => {
    setSearchQuery(text);
    setHasSearched(true);
    
    if (text.trim() === "") {
      loadPopularMovies();
      return;
    }

    try {
      setLoading(true);
      const response = await api.searchMovies(text.trim());
      if (response.results) {
        setMovies(response.results);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error searching movies:', error);
      // Fallback to local search in sample data
      const filtered = SAMPLE_MOVIES.filter(movie =>
        movie.title.toLowerCase().includes(text.toLowerCase())
      );
      setMovies(filtered);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔍 Search Movies</Text>
        
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#ccc" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for movies..."
            placeholderTextColor="#ccc"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            {loading ? (
              <Text style={styles.emptyText}>Searching...</Text>
            ) : hasSearched ? (
              <Text style={styles.emptyText}>No movies found</Text>
            ) : (
              <Text style={styles.emptyText}>Popular movies</Text>
            )}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 20,
  },
  movieCard: {
    flexDirection: 'row',
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginRight: 15,
  },
  movieInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  movieYear: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 5,
  },
  movieRating: {
    fontSize: 14,
    color: '#ffd700',
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#ccc',
  },
});