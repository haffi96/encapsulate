import {
  StyleSheet, Text, View, TouchableOpacity, FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import Workout from '../../components/WorkOut';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#383A59',
  },
  workoutsWrapper: {
    paddingTop: 30,
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

const WorkOutItemsArray = [
  {
    id: 1,
    name: 'Monday',
    category: 'Chest',
    date: Date.now(),
  },
  {
    id: 2,
    name: 'Tuesday',
    category: 'Back',
    date: Date.now(),
  },
];

function LogListScreen({ props, navigation }) {
  const [workOutItems, setWorkOutItems] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getWorkouts = async () => {
      setWorkOutItems(WorkOutItemsArray);
    };

    if (isFocused) {
      getWorkouts();
    }
  }, [props, isFocused]);

  const deleteWorkoutLog = async (docID, index) => {
    const itemsCopy = [...workOutItems];
    itemsCopy.splice(index, 1);
    setWorkOutItems(itemsCopy);
  };

  const renderWorkoutItem = ({ item, index }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => navigation.navigate('Workout', {
        workOutItem: item,
        index,
      })}
    >
      <Workout
        name={item.name}
        category={item.category}
        date={item.date}
        deleteAction={() => deleteWorkoutLog(item.id, index)}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.workoutsWrapper}>
        <Text style={styles.sectionTitle}>Workouts Log</Text>
        <FlatList
          data={workOutItems}
          keyExtractor={(item) => item.id}
          renderItem={(item, index) => renderWorkoutItem(item, index)}
        />
      </View>
    </View>
  );
}

export default LogListScreen;
