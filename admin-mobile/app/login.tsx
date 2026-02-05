import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useAdminAuth } from "../contexts/AdminAuthContext";
import { NETWORK_CONFIG } from "../config/network";

const { width, height } = Dimensions.get('window');

export default function AdminLoginScreen() {
  const router = useRouter();
  const { login } = useAdminAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    try {
      Alert.alert('Testing Connection', 'Checking server connectivity...');
      
      const response = await fetch(`${NETWORK_CONFIG.API_BASE_URL}${NETWORK_CONFIG.HEALTH_ENDPOINT}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Connection Test', `✅ Server is reachable!\n\nStatus: ${data.status}\nEnvironment: ${data.environment || 'development'}`);
      } else {
        Alert.alert('Connection Test', `❌ Server responded with error: ${response.status}`);
      }
    } catch (error) {
      console.error('Connection test error:', error);
      Alert.alert('Connection Test', `❌ Connection failed!\n\nError: ${error.message}\n\nPlease ensure:\n1. Backend server is running\n2. Device is on same network\n3. IP address is correct (${NETWORK_CONFIG.API_BASE_URL})`);
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const result = await login(username, password);
      if (result.success) {
        router.replace('/(tabs)');
      } else {
        // Show more specific error messages
        let errorMessage = result.error || 'Invalid credentials';
        if (errorMessage.includes('connection') || errorMessage.includes('network')) {
          errorMessage = 'Connection failed. Please check your network connection and ensure the backend server is running.';
        } else if (errorMessage.includes('Invalid credentials') || errorMessage.includes('Invalid admin credentials')) {
          errorMessage = 'Invalid username or password. Please try:\n\nAdmin: admin / admin123\nModerator: moderator / mod123';
        }
        Alert.alert('Login Failed', errorMessage);
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Connection Error', 'Unable to connect to the server. Please ensure:\n\n1. Backend server is running on port 3000\n2. Your device is connected to the same network\n3. Firewall is not blocking the connection');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#1a1a1a', '#2d2d2d', '#000000']}
      style={styles.container}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Ionicons name="shield-checkmark" size={60} color="#FF6B6B" />
            </View>
            <Text style={styles.logoText}>CinemaMax</Text>
            <Text style={styles.logoSubtext}>Admin Dashboard</Text>
          </View>

          {/* Login Form */}
          <View style={styles.formContainer}>
            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Text style={styles.subtitleText}>Sign in to your admin account</Text>

            {/* Username Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Username"
                  placeholderTextColor="#888"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={[styles.textInput, { flex: 1 }]}
                  placeholder="Password"
                  placeholderTextColor="#888"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons 
                    name={showPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="#888" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={[styles.loginButton, loading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              <LinearGradient
                colors={['#FF6B6B', '#FF8E8E']}
                style={styles.loginButtonGradient}
              >
                {loading ? (
                  <View style={styles.loadingContainer}>
                    <Ionicons name="refresh" size={20} color="#FFF" />
                    <Text style={styles.loginButtonText}>Signing in...</Text>
                  </View>
                ) : (
                  <Text style={styles.loginButtonText}>Sign In</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Demo Credentials */}
            <View style={styles.demoContainer}>
              <Text style={styles.demoTitle}>Admin Credentials:</Text>
              <View style={styles.demoCredentials}>
                <View style={styles.demoRow}>
                  <Text style={styles.demoLabel}>Super Admin:</Text>
                  <Text style={styles.demoValue}>admin / admin123</Text>
                </View>
                <View style={styles.demoRow}>
                  <Text style={styles.demoLabel}>Moderator:</Text>
                  <Text style={styles.demoValue}>moderator / mod123</Text>
                </View>
              </View>
              
              {/* Connection Test Button */}
              <TouchableOpacity
                style={styles.testButton}
                onPress={testConnection}
              >
                <Text style={styles.testButtonText}>Test Connection</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>© 2024 CinemaMax. All rights reserved.</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoCircle: {
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
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  logoSubtext: {
    fontSize: 16,
    color: '#888',
  },
  formContainer: {
    width: '100%',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  inputIcon: {
    marginRight: 15,
  },
  textInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 5,
  },
  loginButton: {
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 15,
    overflow: 'hidden',
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  demoContainer: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#60A5FA',
    marginBottom: 15,
    textAlign: 'center',
  },
  demoCredentials: {
    gap: 10,
  },
  demoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  demoLabel: {
    fontSize: 14,
    color: '#93C5FD',
    fontWeight: '500',
  },
  demoValue: {
    fontSize: 14,
    color: '#DBEAFE',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  testButton: {
    marginTop: 15,
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.4)',
  },
  testButtonText: {
    color: '#4ADE80',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
  },
});