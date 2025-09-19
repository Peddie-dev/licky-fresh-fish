import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack>
        {/* Home screen */}
        <Stack.Screen name="index" options={{ headerShown: false }} />

        {/* Dish detail screen */}
        <Stack.Screen name="dishdetail" options={{ headerShown: false }} />

        {/* Checkout screen */}
        <Stack.Screen name="checkout" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
