import { SplashScreen, Stack } from "expo-router";
import './globals.css'
import { useFonts } from 'expo-font';
import { useEffect } from "react";
import * as Sentry from '@sentry/react-native';
import useAuthStore from "@/store/auth.store";
import { ActivityIndicator, StyleSheet, View } from "react-native";

Sentry.init({
  dsn: 'https://ccb475f36b723be29b7688e810a06152@o4507830493052928.ingest.us.sentry.io/4507830511271936',
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

  const {isLoading, fetchAuthenticatedUser} = useAuthStore();

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  useEffect(() => {
    fetchAuthenticatedUser();
  },[]);

  const styles = StyleSheet.create({
    loaderContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",     
      backgroundColor: "#fff", // dark background for contrast (optional)
      padding: 10,
      borderRadius: 8,
    },
  });

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={40} color="#4CAF50" />
      </View>
    );
  }



  return <Stack
    screenOptions={{ headerShown: false }}
    initialRouteName="(tabs)" // This sets tabs as the initial route
  >
    <Stack.Screen name="(tabs)" />
    <Stack.Screen name="(auth)" />
  </Stack>
});