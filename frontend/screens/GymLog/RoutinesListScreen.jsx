import {
    Text, View, TouchableOpacity, FlatList,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { retrieveAllGymLogRoutinesForUser } from '../../services/apiRequests';
import Routine from '../../components/Routine';

function RoutinesScreen({ props, navigation }) {
    const [routineItems, setRoutineItems] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const isFocused = useIsFocused();
    const { authState } = useAuth();

    useEffect(() => {
        const getAllRoutines = async () => {
            const newRoutines = await retrieveAllGymLogRoutinesForUser(authState.token);
            setRoutineItems(newRoutines);
        };

        if (isFocused) {
            getAllRoutines();
        }
    }, [props, isFocused]);

    const renderRoutineItem = ({ item, index }) => (
        <TouchableOpacity
            key={item.gym_routine_uuid}
            onPress={() => navigation.navigate('Routine', {
                workOutItem: item,
                index,
            })}
        >
            <Routine
                routineName={item.slug}
            // deleteAction={() => deleteWorkoutLog(item.id, index)}
            />
        </TouchableOpacity>
    );

    const refreshWorkOutItems = async () => {
        const newRoutines = await retrieveAllGymLogRoutinesForUser(authState.token);
        setIsRefreshing(true);
        setRoutineItems(newRoutines);
        setIsRefreshing(false);
    };

    return (
        <View className="flex h-full bg-purple">
            <View className="flex pt-10 px-5 h-full">
                <Text className="text-xl font-bold mb-5 text-center">
                    Routines
                </Text>
                <FlatList
                    data={routineItems}
                    keyExtractor={(item) => item.gym_routine_uuid}
                    renderItem={(item, index) => renderRoutineItem(item, index)}
                    onRefresh={refreshWorkOutItems}
                    refreshing={isRefreshing}
                />
            </View>
        </View>
    );
}

export default RoutinesScreen;
