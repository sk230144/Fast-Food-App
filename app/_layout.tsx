import { SplashScreen, Stack } from "expo-router";
import './globals.css'
import { useFonts } from 'expo-font';
import { useEffect } from "react";
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://ccb475f36b723be29b7688e810a06152@o4507830493052928.ingest.us.sentry.io/4507830511271936',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "QuickSand-Bold": require('../assets/fonts/Quicksand-Bold.ttf'),
    "QuickSand-Medium": require('../assets/fonts/Quicksand-Medium.ttf'),
    "QuickSand-Regular": require('../assets/fonts/Quicksand-Regular.ttf'),
    "QuickSand-SemiBold": require('../assets/fonts/Quicksand-SemiBold.ttf'),
    "QuickSand-Light": require('../assets/fonts/Quicksand-Light.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  return <Stack
    screenOptions={{ headerShown: false }}
    initialRouteName="(tabs)" // This sets tabs as the initial route
  >
    <Stack.Screen name="(tabs)" />
    <Stack.Screen name="(auth)" />
  </Stack>
});