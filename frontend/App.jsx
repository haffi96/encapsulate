/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// eslint-disable-next-line import/no-unresolved
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import AllNotesScreen from './screens/Notes/AllNotesScreen';
import CreateNoteScreen from './screens/Notes/CreateNoteScreen';
import NoteScreen from './screens/Notes/NoteScreen';
import TodoScreen from './screens/TodoScreen';
import GymLogScreen from './screens/GymLog/GymLogHomeScreen';
import LogListScreen from './screens/GymLog/LogListScreen';
import RoutinesScreen from './screens/GymLog/RoutinesScreen';
import WorkoutScreen from './screens/GymLog/WorkOutScreen';

const Tab = createMaterialTopTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function NotesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="allNotes" component={AllNotesScreen} />
      <Stack.Screen options={{ headerShown: false }} name="createNote" component={CreateNoteScreen} />
      <Stack.Screen options={{ headerShown: false }} name="note" component={NoteScreen} />
    </Stack.Navigator>
  );
}

function GymLogStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="GymLogs" component={GymLogScreen} />
      <Stack.Screen options={{ headerShown: false }} name="LogList" component={LogListScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Routines" component={RoutinesScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Workout" component={WorkoutScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Login"
        screenOptions={
          {
            tabBarStyle:
            {
              backgroundColor: '#BD93F9', position: 'relative', paddingTop: 50,
            },
            tabBarShowLabel: false,
          }
}
      >
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="login" color={color} size={size} />
            ),
          }}
          name="Login"
          component={LoginScreen}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="note" color={color} size={size} />
            ),
          }}
          name="Notes"
          component={NotesStack}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="check" color={color} size={size} />
            ),
          }}
          name="Todo"
          component={TodoScreen}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="weight" color={color} size={size} />
            ),
          }}
          name="Gym"
          component={GymLogStack}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
