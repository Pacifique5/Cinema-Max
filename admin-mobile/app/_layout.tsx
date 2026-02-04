import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { AdminAuthProvider, useAdminAuth } from "../contexts/AdminAuthContext";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { LoadingScreen } from "../components/LoadingScreen";
import { useRouter, useSegments } from "expo-router";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { user, isLoading } = useAdminAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // Hide splash screen after auth is loaded
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;

    const inTabsGroup = segments[0] === '(tabs)';
    
    // If user tries to access tabs without authentication, redirect to login
    if (inTabsGroup && !user) {
      router.replace('/login');
    }
    // If user is authenticated and on login, redirect to dashboard
    else if (user && segments[0] === 'login') {
      router.replace('/(tabs)');
    }
  }, [user, isLoading, segments]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AdminAuthProvider>
      <RootLayoutNav />
    </AdminAuthProvider>
  );
}