import {
    View, FlatList, Text,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import Exercise from '../../components/Exercise';
import { retrieveSingleGymRoutine } from '../../services/collections';
import { auth } from '../../firebase';

function WorkoutScreen({ props, route }) {
    const { workOutItem } = route.params;

    const [routineItem, setRoutineItem] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        const getRoutine = async () => {
            const routine = await
                retrieveSingleGymRoutine(auth.currentUser.uid, workOutItem.routineId);
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
        const newRoutine = await
            retrieveSingleGymRoutine(auth.currentUser.uid, workOutItem.routineId);
        setIsRefreshing(true);
        setRoutineItem(newRoutine);
        setIsRefreshing(false);
    };

    return (
        <View className="flex h-full bg-purple">
            <View className="flex pt-10 px-5 h-full">
                <Text className="text-lg font-bold text-center mb-5 text-white">
                    {routineItem.routineName}
                </Text>
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
