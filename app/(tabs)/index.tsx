import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from "react-native";
import { useState, useEffect } from "react";

// Simple movie data - no external API needed
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

const MovieCard = ({ movie }: { movie: any }) => (
  <TouchableOpacity style={styles.movieCard}>
    <Image source={{ uri: movie.poster }} style={styles.poster} />
    <Text style={styles.movieTitle} numberOfLines={1}>{movie.title}</Text>
    <Text style={styles.movieYear}>{movie.year}</Text>
    <Text style={styles.movieRating}>⭐ {movie.rating}</Text>
  </TouchableOpacity>
);

export default function Index() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🎬 Movie App</Text>
          <Text style={styles.headerSubtitle}>Discover amazing movies</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Movies</Text>
          <FlatList
            data={SAMPLE_MOVIES}
            renderItem={({ item }) => <MovieCard movie={item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ccc',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  movieCard: {
    width: '48%',
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 10,
  },
  poster: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  movieTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  movieYear: {
    fontSize: 12,
    color: '#ccc',
    marginBottom: 4,
  },
  movieRating: {
    fontSize: 12,
    color: '#ffd700',
    fontWeight: 'bold',
  },
});