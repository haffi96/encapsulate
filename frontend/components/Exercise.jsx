import {
  StyleSheet, Text, View,
} from 'react-native';
import React from 'react';
import Set from './Set';
import defaultScheme from '../colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: defaultScheme.accent,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 10,
    borderRadius: 10,
    marginBottom: 5,
    shadowColor: defaultScheme.shadowDark,
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  exerciseTitle: {
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  setsWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  setsHeading: {
    paddingRight: 110,
  },
});

function Exercise(props) {
  const { exerciseItem } = props;

  const Sets = ({ count }) => (
    Array.from({ length: count }).map((index) => <Set key={index} />)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.exerciseTitle}>{exerciseItem.exerciseName}</Text>
      <View>
        <View style={styles.setsWrapper}>
          <Text style={styles.setsHeading}>Sets</Text>
          <Text>Reps</Text>
        </View>
        <Sets count={exerciseItem.sets} />
      </View>
    </View>
  );
}

export default Exercise;
