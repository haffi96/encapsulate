import {
    Text, View, TouchableOpacity, FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import Workout from '../../components/WorkOut';
import { deleteWorkoutLogForUser, retrieveGymLogForUser } from '../../services/collections';
import { auth } from '../../firebase';

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
        <View className="flex h-full bg-purple">
            <View className="flex pt-10 px-5 h-full">
                <Text className="text-xl font-bold mb-5 text-center">
                    Workouts Log
                </Text>
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
