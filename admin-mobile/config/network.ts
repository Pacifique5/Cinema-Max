// Network configuration for mobile admin app
// Update this IP address to match your development machine's IP

export const NETWORK_CONFIG = {
  // Get your IP address by running: ipconfig (Windows) or ifconfig (Mac/Linux)
  // Use the IP address shown in the Expo QR code above
  API_BASE_URL: 'http://10.12.74.198:3000',
  
  // Alternative configurations for different environments
  LOCALHOST: 'http://localhost:3000', // Won't work on physical devices
  EXPO_IP: 'http://10.12.74.198:3000', // Current Expo development IP
  
  // Health check endpoint
  HEALTH_ENDPOINT: '/health',
  
  // API endpoints
  ENDPOINTS: {
    ADMIN_LOGIN: '/api/auth/admin/login',
    ADMIN_VERIFY: '/api/auth/admin/verify',
    ADMIN_LOGOUT: '/api/auth/signout',
    ADMIN_STATS: '/api/admin/stats',
    ADMIN_HEALTH: '/api/admin/health',
    ADMIN_USERS: '/api/admin/users',
    ADMIN_MOVIES: '/api/admin/movies'
  }
};

export default NETWORK_CONFIG;