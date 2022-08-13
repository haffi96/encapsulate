import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

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
      <Text>LogListScren</Text>
    </View>
  );
}

export default WorkoutScreen;
