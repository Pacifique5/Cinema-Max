# CinemaMax Frontend

React Native mobile app for browsing movies, managing favorites, and discovering new content.

## 🚀 Features

- **Authentication**: Sign up, sign in, and guest mode
- **Movie Discovery**: Browse popular and trending movies
- **Search**: Find movies by title, genre, or actor
- **User Features**: Favorites, watchlist, and personalized recommendations
- **Profile Management**: Edit profile, dark mode, and settings
- **Responsive Design**: Optimized for both iOS and Android

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio/Emulator (for Android development)

## 🛠 Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Install Expo CLI (if not already installed)

```bash
npm install -g @expo/cli
```

### 3. Environment Configuration

Create a `.env` file in the frontend directory:
```env
# Backend API Configuration
EXPO_PUBLIC_API_URL=http://localhost:3000/api

# Supabase Configuration (for direct client access)
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Update API Configuration

Update the API base URL in your services:
```typescript
// services/api.ts
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';
```

## 🏃‍♂️ Running the App

### Start the development server
```bash
npm start
```

### Run on specific platforms
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📱 App Structure

```
frontend/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Home screen
│   │   ├── search.tsx     # Search screen
│   │   └── profile.tsx    # Profile screen
│   ├── auth/              # Authentication screens
│   │   ├── login.tsx      # Login screen
│   │   └── signup.tsx     # Signup screen
│   ├── movie/             # Movie detail screens
│   │   └── [id].tsx       # Movie detail screen
│   ├── index.tsx          # Landing/Welcome screen
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
│   ├── OptimizedImage.tsx # Image component with loading
│   └── LoadingScreen.tsx  # Loading screen component
├── contexts/              # React contexts
│   └── AuthContext.tsx    # Authentication context
├── services/              # API services
│   ├── api.ts            # API client
│   ├── auth.ts           # Authentication services
│   └── movies.ts         # Movie services
└── types/                 # TypeScript type definitions
    └── index.ts          # Common types
```

## 🔧 Key Components

### Authentication Context
Manages user authentication state, login, logout, and user data.

### Optimized Image Component
Handles image loading with loading states and error handling for better performance.

### API Services
Centralized API calls to the backend with proper error handling and type safety.

## 🎨 Styling

The app uses a consistent design system:
- **Primary Color**: #FF6B6B (Red)
- **Background**: Dark theme with gradients
- **Typography**: System fonts with proper hierarchy
- **Components**: Modern card-based design with shadows and rounded corners

## 📦 Dependencies

### Core
- **expo**: ~54.0.0
- **expo-router**: Navigation and routing
- **react-native**: Core React Native framework

### UI & Styling
- **expo-linear-gradient**: Gradient backgrounds
- **@expo/vector-icons**: Icon library

### Storage & State
- **@react-native-async-storage/async-storage**: Local storage
- **@supabase/supabase-js**: Supabase client

### Utilities
- **expo-splash-screen**: Splash screen management
- **expo-status-bar**: Status bar configuration

## 🔄 State Management

The app uses React Context for state management:

### AuthContext
- User authentication state
- Login/logout functionality
- User profile data
- Guest mode handling

### Future Contexts
- MoviesContext (for movie data caching)
- ThemeContext (for theme management)
- SettingsContext (for app settings)

## 🚀 Building for Production

### Create production build
```bash
# Create build
expo build

# Or use EAS Build (recommended)
eas build --platform all
```

### Environment Variables for Production
Make sure to set production environment variables:
- `EXPO_PUBLIC_API_URL`: Your production backend URL
- `EXPO_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key

## 📱 Platform-Specific Notes

### iOS
- Requires Xcode for development
- App Store deployment requires Apple Developer account
- Push notifications require APNs configuration

### Android
- Requires Android Studio for development
- Google Play Store deployment
- Push notifications require FCM configuration

## 🧪 Testing

### Run tests
```bash
npm test
```

### E2E Testing (when implemented)
```bash
npm run test:e2e
```

## 🔧 Development Tips

### Debugging
- Use Flipper for React Native debugging
- Expo DevTools for Expo-specific debugging
- React Native Debugger for advanced debugging

### Performance
- Use OptimizedImage component for all images
- Implement lazy loading for large lists
- Use React.memo for expensive components
- Optimize bundle size with Metro bundler

### Code Quality
- Use TypeScript for type safety
- Follow ESLint rules
- Use Prettier for code formatting
- Implement proper error boundaries

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the coding standards
4. Test on both iOS and Android
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details