import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Set from './Set';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#383A59',
  },
});

function WorkOut(props) {
  const {
    id, name, category, date,
  } = props;
  return (
    <View>
      <Text>Workout</Text>
    </View>
  );
}

export default WorkOut;
