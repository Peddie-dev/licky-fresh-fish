// RootLayout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* This screen is for the tab bar navigator, and it will link to the _layout.tsx inside the (tabs) folder */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        {/* This screen is for the DishDetail page. It will be pushed on top of the tabs when you navigate to it */}
        <Stack.Screen name="DishDetail" options={{ headerShown: false }} />
        
        {/* The +not-found screen is a fallback for invalid routes */}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}