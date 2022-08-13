import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import WorkOut from '../../components/WorkOut';
import Exercise from '../../components/Exercise';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#383A59',
  },
});

function WorkoutScreen() {
  return (
    <View style={styles.container}>
      <Exercise />
    </View>
  );
}

export default WorkoutScreen;
