import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#383A59',
  },
  button: {
    backgroundColor: '#BD93F9',
    width: '100%',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
});

function GymLogScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>GymLogTempScreen</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LogList')}>
        <Text>LogScreen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Routines')}>
        <Text>RoutinesScreen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Workout')}>
        <Text>WorkoutScreen</Text>
      </TouchableOpacity>
    </View>
  );
}

export default GymLogScreen;
