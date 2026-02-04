import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  RefreshControl
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useAdminAuth } from "../../contexts/AdminAuthContext";

const { width } = Dimensions.get('window');

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string[];
  change?: string;
}

function StatCard({ title, value, icon, color, change }: StatCardProps) {
  return (
    <View style={styles.statCard}>
      <LinearGradient colors={color} style={styles.statGradient}>
        <View style={styles.statHeader}>
          <Ionicons name={icon as any} size={24} color="#FFF" />
          {change && (
            <View style={styles.changeContainer}>
              <Ionicons name="trending-up" size={12} color="#4ADE80" />
              <Text style={styles.changeText}>{change}</Text>
            </View>
          )}
        </View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </LinearGradient>
    </View>
  );
}

export default function AdminDashboard() {
  const { user } = useAdminAuth();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 1247,
    totalMovies: 856,
    totalFavorites: 3421,
    totalReviews: 892,
    newUsersToday: 23,
    newUsersThisWeek: 156
  });

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setStats(prev => ({
        ...prev,
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 10),
        newUsersToday: Math.floor(Math.random() * 50)
      }));
      setRefreshing(false);
    }, 1000);
  };

  return (
    <LinearGradient colors={['#1a1a1a', '#2d2d2d']} style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FF6B6B" />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.nameText}>{user?.username}</Text>
          </View>
          <View style={styles.avatarContainer}>
            <LinearGradient colors={['#FF6B6B', '#FF8E8E']} style={styles.avatar}>
              <Text style={styles.avatarText}>{user?.username?.charAt(0).toUpperCase()}</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <StatCard
              title="Total Users"
              value={stats.totalUsers.toLocaleString()}
              icon="people"
              color={['#3B82F6', '#1D4ED8']}
              change="+12%"
            />
            <StatCard
              title="Total Movies"
              value={stats.totalMovies.toLocaleString()}
              icon="film"
              color={['#8B5CF6', '#7C3AED']}
            />
          </View>
          <View style={styles.statsRow}>
            <StatCard
              title="Favorites"
              value={stats.totalFavorites.toLocaleString()}
              icon="heart"
              color={['#EC4899', '#DB2777']}
              change="+8%"
            />
            <StatCard
              title="Reviews"
              value={stats.totalReviews.toLocaleString()}
              icon="star"
              color={['#F59E0B', '#D97706']}
            />
          </View>
        </View>

        {/* Growth Stats */}
        <View style={styles.growthContainer}>
          <Text style={styles.sectionTitle}>Growth Metrics</Text>
          <View style={styles.growthStats}>
            <View style={styles.growthItem}>
              <Text style={styles.growthValue}>{stats.newUsersToday}</Text>
              <Text style={styles.growthLabel}>New Users Today</Text>
            </View>
            <View style={styles.growthDivider} />
            <View style={styles.growthItem}>
              <Text style={styles.growthValue}>{stats.newUsersThisWeek}</Text>
              <Text style={styles.growthLabel}>New Users This Week</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => router.push('/add-movie')}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#FF6B6B' }]}>
                <Ionicons name="add-circle" size={24} color="#FFF" />
              </View>
              <Text style={styles.actionText}>Add Movie</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionItem}>
              <View style={[styles.actionIcon, { backgroundColor: '#3B82F6' }]}>
                <Ionicons name="people" size={24} color="#FFF" />
              </View>
              <Text style={styles.actionText}>View Users</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionItem}>
              <View style={[styles.actionIcon, { backgroundColor: '#10B981' }]}>
                <Ionicons name="bar-chart" size={24} color="#FFF" />
              </View>
              <Text style={styles.actionText}>Analytics</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionItem}>
              <View style={[styles.actionIcon, { backgroundColor: '#8B5CF6' }]}>
                <Ionicons name="settings" size={24} color="#FFF" />
              </View>
              <Text style={styles.actionText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activityContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            {[
              { action: 'New user registered', time: '2 min ago', icon: 'person-add' },
              { action: 'Movie added to database', time: '15 min ago', icon: 'film' },
              { action: 'User reported content', time: '1 hour ago', icon: 'flag' },
              { action: 'System backup completed', time: '2 hours ago', icon: 'cloud-done' },
            ].map((item, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Ionicons name={item.icon as any} size={16} color="#FF6B6B" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityAction}>{item.action}</Text>
                  <Text style={styles.activityTime}>{item.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  welcomeText: {
    fontSize: 16,
    color: '#888',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 4,
  },
  avatarContainer: {
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statCard: {
    width: (width - 50) / 2,
    borderRadius: 15,
    overflow: 'hidden',
  },
  statGradient: {
    padding: 20,
    height: 120,
    justifyContent: 'space-between',
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(74, 222, 128, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  changeText: {
    fontSize: 10,
    color: '#4ADE80',
    marginLeft: 2,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  statTitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  growthContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
  },
  growthStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  growthItem: {
    flex: 1,
    alignItems: 'center',
  },
  growthValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  growthLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    textAlign: 'center',
  },
  growthDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#333',
    marginHorizontal: 20,
  },
  actionsContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionItem: {
    width: (width - 60) / 2,
    alignItems: 'center',
    marginBottom: 20,
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionText: {
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
  },
  activityContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  activityList: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 15,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#888',
  },
});