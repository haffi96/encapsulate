import {
  StyleSheet, View, FlatList, Text,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import Exercise from '../../components/Exercise';
import { retrieveSingleGymRoutine } from '../../services/collections';
import { auth } from '../../firebase';
import defaultScheme from '../../colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultScheme.background,
  },
  exercisesWrapper: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

function WorkoutScreen({ props, route }) {
  const { workOutItem } = route.params;

  const [routineItem, setRoutineItem] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getRoutine = async () => {
      const routine = await retrieveSingleGymRoutine(auth.currentUser.uid, workOutItem.routineId);
      setRoutineItem(routine);
    };

    if (isFocused) {
      getRoutine();
    }
  }, [props, isFocused]);

  const renderExerciseItem = ({ item, index }) => (
    <View key={index}>
      <Exercise exerciseItem={item} />
    </View>
  );

  const refreshExercises = async () => {
    const newRoutine = await retrieveSingleGymRoutine(auth.currentUser.uid, workOutItem.routineId);
    setIsRefreshing(true);
    setRoutineItem(newRoutine);
    setIsRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.exercisesWrapper}>
        <Text style={styles.sectionTitle}>{routineItem.routineName}</Text>
        <FlatList
          data={routineItem.exercises}
          keyExtractor={(item) => item.exerciseId}
          renderItem={(item, index) => renderExerciseItem(item, index)}
          onRefresh={refreshExercises}
          refreshing={isRefreshing}
        />
      </View>
    </View>
  );
}

export default WorkoutScreen;
