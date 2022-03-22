import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { AuthProvider } from './context/AuthContext';
import NotesScreen from './screens/NotesScreen';
import TodoScreen from './screens/TodoScreen';
import GymLogScreen from './screens/GymLogScreen';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Notes" component={NotesScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Todo" component={TodoScreen} />
          <Stack.Screen options={{ headerShown: false }} name="GymLog" component={GymLogScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
