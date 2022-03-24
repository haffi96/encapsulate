import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AllNotesScreen from './screens/Notes/AllNotesScreen';
import TodoScreen from './screens/TodoScreen';
import GymLogScreen from './screens/GymLogScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Notes" component={AllNotesScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Todo" component={TodoScreen} />
        <Stack.Screen options={{ headerShown: false }} name="GymLog" component={GymLogScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
