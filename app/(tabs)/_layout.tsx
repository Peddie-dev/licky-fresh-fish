// Correct layout.tsx for Expo Router
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import DishDetailScreen from '../screens/DishDetail';
import HomeScreen from './index';

const Stack = createNativeStackNavigator();

export default function Layout() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DishDetail"
        component={DishDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}