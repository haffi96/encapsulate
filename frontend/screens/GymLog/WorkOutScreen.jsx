import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Exercise from '../../components/Exercise';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#383A59',
  },
});

function WorkoutScreen({ route, navigation }) {
  const { workOutItem, index } = route.params;

  return (
    <View style={styles.container}>
      <Text>
        {workOutItem.id}
        ,
        {' '}
        {workOutItem.name}
        ,
        {' '}
        {workOutItem.category}
      </Text>
      <Exercise />
    </View>
  );
}

export default WorkoutScreen;
