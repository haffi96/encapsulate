import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import colorScheme from '../colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorScheme.background,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colorScheme.accent,
    width: '100%',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
});

function HomeScreen({ navigation }) {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('Login');
      })
      // eslint-disable-next-line no-alert
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Notes')}
          style={styles.button}
        >
          <Text>Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Todo')}
          style={styles.button}
        >
          <Text>Todo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Gym')}
          style={styles.button}
        >
          <Text>Gym log</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignOut}
          style={styles.button}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeScreen;
