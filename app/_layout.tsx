// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { CartProvider } from '@/app/context/CartContext'; // ✅ cleaned path for context
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
    <CartProvider> {/* ✅ Cart context available app-wide */}
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          {/* Tabs layout */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          {/* Dish details screen */}
          <Stack.Screen name="DishDetail" options={{ headerShown: false }} />

          {/* Checkout screen */}
          <Stack.Screen name="Checkout" options={{ headerShown: false }} />

          {/* Not found */}
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </CartProvider>
  );
}
