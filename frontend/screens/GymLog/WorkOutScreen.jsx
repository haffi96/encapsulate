import {
    View, FlatList, Text,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import Exercise from '../../components/Exercise';
import { retrieveExercisesBySlugs } from '../../services/apiRequests';
import { useAuth } from '../../context/AuthContext';

function WorkoutScreen({ props, route }) {
    const { logEntryItem } = route.params;

    const [exerciseItem, setExerciseItems] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const isFocused = useIsFocused();
    const { authState } = useAuth();

    useEffect(() => {
        const fetchExercises = async () => {
            const routine = await
                retrieveExercisesBySlugs(authState.token, logEntryItem.routineId);
            setExerciseItems(routine);
        };

        if (isFocused) {
            fetchExercises();
        }
    }, [props, isFocused]);

    const renderExerciseItem = ({ item, index }) => (
        <View key={index}>
            <Exercise exerciseItem={item} />
        </View>
    );

    const refreshExercises = async () => {
        // const newRoutine = await
        //     retrieveSingleGymRoutine(auth.currentUser.uid, workOutItem.routineId);
        setIsRefreshing(true);
        setIsRefreshing(false);
    };

    return (
        <View className="flex h-full bg-purple">
            <View className="flex pt-10 px-5 h-full">
                <Text className="text-lg font-bold text-center mb-5 text-white">
                    {logEntryItem.routine}
                </Text>
                <FlatList
                    data={exerciseItem}
                    keyExtractor={(item) => item.exerciseUuid}
                    renderItem={(item, index) => renderExerciseItem(item, index)}
                    onRefresh={refreshExercises}
                    refreshing={isRefreshing}
                />
            </View>
        </View>
    );
}

export default WorkoutScreen;
