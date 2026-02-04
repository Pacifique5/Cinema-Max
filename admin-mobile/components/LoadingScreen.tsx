import { View, Text, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

export function LoadingScreen() {
  return (
    <LinearGradient
      colors={['#1a1a1a', '#2d2d2d', '#000000']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Ionicons name="shield-checkmark" size={60} color="#FF6B6B" />
        </View>
        <Text style={styles.title}>CinemaMax Admin</Text>
        <View style={styles.loadingContainer}>
          <Ionicons name="refresh" size={24} color="#FF6B6B" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 107, 107, 0.3)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
  },
})