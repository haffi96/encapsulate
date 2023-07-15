import {
  StyleSheet, Text, View, TouchableOpacity, FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import Workout from '../../components/WorkOut';
import { deleteWorkoutLogForUser, retrieveGymLogForUser } from '../../services/collections';
import { auth } from '../../firebase';
import defaultScheme from '../../colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultScheme.background,
  },
  workoutsWrapper: {
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

function LogListScreen({ props, navigation }) {
  const [workOutItems, setWorkOutItems] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getWorkouts = async () => {
      const newWorkouts = await retrieveGymLogForUser(auth.currentUser.uid);
      setWorkOutItems(newWorkouts);
    };

    if (isFocused) {
      getWorkouts();
    }
  }, [props, isFocused]);

  const deleteWorkoutLog = async (docID, index) => {
    const itemsCopy = [...workOutItems];
    await deleteWorkoutLogForUser(auth.currentUser.uid, docID);
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
        routineName={item.routineName}
        date={item.created_at}
        deleteAction={() => deleteWorkoutLog(item.id, index)}
      />
    </TouchableOpacity>
  );

  const refreshWorkOutItems = async () => {
    const newWorkouts = await retrieveGymLogForUser(auth.currentUser.uid);
    setIsRefreshing(true);
    setWorkOutItems(newWorkouts);
    setIsRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.workoutsWrapper}>
        <Text style={styles.sectionTitle}>Workouts Log</Text>
        <FlatList
          data={workOutItems}
          keyExtractor={(item) => item.id}
          renderItem={(item, index) => renderWorkoutItem(item, index)}
          onRefresh={refreshWorkOutItems}
          refreshing={isRefreshing}
        />
      </View>
    </View>
  );
}

export default LogListScreen;
