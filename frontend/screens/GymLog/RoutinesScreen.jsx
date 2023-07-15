import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import defaultScheme from '../../colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: defaultScheme.background,
  },
});

function RoutinesScreen() {
  return (
    <View style={styles.container}>
      <Text>RoutinesScreen</Text>
    </View>
  );
}

export default RoutinesScreen;
