import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { AuthContext } from '../context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNavigationContainers } from 'react-navigation';

const HomeScreen = ({ navigation }) => {
  // const val = useContext(AuthContext);

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
                onPress={() => navigation.navigate('GymLog')}
                style={styles.button}
            >
                <Text>Gym log</Text>
            </TouchableOpacity>
        </View>
    </View>
)
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#383A59',
  },
  buttonContainer: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
  },
  button: {
      backgroundColor: '#BD93F9',
      width: '100%',
      padding: 15,
      borderRadius: 20,
      alignItems: 'center',
      marginVertical: 10

  },
});