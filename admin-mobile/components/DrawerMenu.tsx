import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAdminAuth } from '../contexts/AdminAuthContext';

const { width, height } = Dimensions.get('window');

interface DrawerMenuProps {
  isVisible: boolean;
  onClose: () => void;
  slideAnim: Animated.Value;
  overlayAnim: Animated.Value;
}

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  route: string;
  permission?: string;
  color: string;
}

export default function DrawerMenu({ isVisible, onClose, slideAnim, overlayAnim }: DrawerMenuProps) {
  const router = useRouter();
  const { user, hasPermission, logout } = useAdminAuth();

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: 'grid',
      route: '/(tabs)/',
      color: '#FF6B6B'
    },
    {
      id: 'users',
      title: 'User Management',
      icon: 'people',
      route: '/(tabs)/users',
      permission: 'users.read',
      color: '#667eea'
    },
    {
      id: 'movies',
      title: 'Movie Management',
      icon: 'film',
      route: '/(tabs)/movies',
      permission: 'movies.read',
      color: '#f093fb'
    },
    {
      id: 'analytics',
      title: 'Analytics & Reports',
      icon: 'bar-chart',
      route: '/(tabs)/analytics',
      permission: 'analytics.read',
      color: '#43e97b'
    },
    {
      id: 'add-movie',
      title: 'Add New Movie',
      icon: 'add-circle',
      route: '/add-movie',
      color: '#4facfe'
    },
  ];

  const handleMenuItemPress = (item: MenuItem) => {
    if (item.permission && !hasPermission(item.permission)) {
      return;
    }
    
    onClose();
    setTimeout(() => {
      router.push(item.route as any);
    }, 300);
  };

  const handleLogout = () => {
    onClose();
    setTimeout(() => {
      logout();
      router.replace('/login');
    }, 300);
  };

  const handleProfile = () => {
    onClose();
    setTimeout(() => {
      router.push('/(tabs)/profile');
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      {/* Overlay */}
      <Animated.View 
        style={[
          styles.overlay,
          {
            opacity: overlayAnim,
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.overlayTouchable}
          onPress={onClose}
          activeOpacity={1}
        />
      </Animated.View>

      {/* Drawer */}
      <Animated.View 
        style={[
          styles.drawer,
          {
            transform: [{ translateX: slideAnim }]
          }
        ]}
      >
        <LinearGradient colors={['#1a1a1a', '#2d2d2d']} style={styles.drawerContent}>
          {/* Header */}
          <View style={styles.drawerHeader}>
            <View style={styles.userInfo}>
              <LinearGradient colors={['#FF6B6B', '#FF8E8E']} style={styles.userAvatar}>
                <Text style={styles.userAvatarText}>
                  {user?.username?.charAt(0).toUpperCase()}
                </Text>
              </LinearGradient>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{user?.username}</Text>
                <View style={styles.userRole}>
                  <View style={[styles.roleDot, { 
                    backgroundColor: user?.role === 'admin' ? '#FF6B6B' : '#4ECDC4' 
                  }]} />
                  <Text style={styles.roleText}>{user?.role?.toUpperCase()}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.menuSectionTitle}>Navigation</Text>
            
            {menuItems.map((item, index) => {
              const isDisabled = item.permission && !hasPermission(item.permission);
              
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.menuItem,
                    isDisabled && styles.menuItemDisabled
                  ]}
                  onPress={() => handleMenuItemPress(item)}
                  disabled={isDisabled}
                  activeOpacity={0.7}
                >
                  <View style={[styles.menuIcon, { backgroundColor: `${item.color}20` }]}>
                    <Ionicons name={item.icon as any} size={20} color={item.color} />
                  </View>
                  <Text style={[
                    styles.menuItemText,
                    isDisabled && styles.menuItemTextDisabled
                  ]}>
                    {item.title}
                  </Text>
                  {!isDisabled && (
                    <Ionicons name="chevron-forward" size={16} color="#666" />
                  )}
                  {isDisabled && (
                    <View style={styles.lockedBadge}>
                      <Ionicons name="lock-closed" size={12} color="#666" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}

            <View style={styles.divider} />
            
            <Text style={styles.menuSectionTitle}>Account</Text>
            
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleProfile}
              activeOpacity={0.7}
            >
              <View style={[styles.menuIcon, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                <Ionicons name="person" size={20} color="#8B5CF6" />
              </View>
              <Text style={styles.menuItemText}>Profile & Settings</Text>
              <Ionicons name="chevron-forward" size={16} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuItem, styles.logoutItem]}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <View style={[styles.menuIcon, { backgroundColor: 'rgba(239, 68, 68, 0.2)' }]}>
                <Ionicons name="log-out" size={20} color="#EF4444" />
              </View>
              <Text style={[styles.menuItemText, { color: '#EF4444' }]}>Logout</Text>
              <Ionicons name="chevron-forward" size={16} color="#EF4444" />
            </TouchableOpacity>
          </ScrollView>

          {/* Footer */}
          <View style={styles.drawerFooter}>
            <Text style={styles.footerText}>CinemaMax Admin v1.0.0</Text>
            <Text style={styles.footerSubtext}>© 2024 CinemaMax</Text>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayTouchable: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: width * 0.85,
    maxWidth: 320,
  },
  drawerContent: {
    flex: 1,
    paddingTop: 50,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  userAvatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 4,
  },
  userRole: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  roleText: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  menuSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginBottom: 15,
    marginTop: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  menuItemDisabled: {
    opacity: 0.5,
  },
  logoutItem: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: '#FFF',
    fontWeight: '500',
  },
  menuItemTextDisabled: {
    color: '#666',
  },
  lockedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 20,
  },
  drawerFooter: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  footerSubtext: {
    fontSize: 10,
    color: '#555',
    marginTop: 2,
  },
});