import {
    Text, View, TouchableOpacity, FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import LogEntry from '../../components/LogEntry';
import { deleteWorkoutLogEntryForUser, retrieveGymLogEntriesForUser } from '../../services/apiRequests';
import { useAuth } from '../../context/AuthContext';

function LogEntryListScreen({ props, navigation }) {
    const [logEntries, setLogEntries] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const isFocused = useIsFocused();
    const { authState } = useAuth();

    useEffect(() => {
        const getLogEntries = async () => {
            const fetchedLogEntries = await retrieveGymLogEntriesForUser(authState.token);
            setLogEntries(fetchedLogEntries);
        };

        if (isFocused) {
            getLogEntries();
        }
    }, [props, isFocused]);

    const deleteWorkoutLogEntry = async (gymLogEntryUuid, index) => {
        const itemsCopy = [...logEntries];
        await deleteWorkoutLogEntryForUser(authState.token, gymLogEntryUuid);
        itemsCopy.splice(index, 1);
        setLogEntries(itemsCopy);
    };

    const renderLogEntryItem = ({ item, index }) => (
        <TouchableOpacity
            key={item.gym_log_entry_uuid}
            onPress={() => navigation.navigate('Workout', {
                logEntryItem: item,
                index,
            })}
        >
            <LogEntry
                routineName={item.routine}
                date={item.created_at}
                deleteAction={() => deleteWorkoutLogEntry(item.gym_log_entry_uuid, index)}
            />
        </TouchableOpacity>
    );

    const refreshLogEntryItems = async () => {
        const newWorkouts = await retrieveGymLogEntriesForUser(authState.token);
        setIsRefreshing(true);
        setLogEntries(newWorkouts);
        setIsRefreshing(false);
    };

    return (
        <View className="flex h-full bg-purple">
            <View className="flex pt-10 px-5 h-full">
                <Text className="text-xl font-bold mb-5 text-center">
                    Workouts Log
                </Text>
                <FlatList
                    data={logEntries}
                    keyExtractor={(item) => item.gym_log_entry_uuid}
                    renderItem={(item, index) => renderLogEntryItem(item, index)}
                    onRefresh={refreshLogEntryItems}
                    refreshing={isRefreshing}
                />
            </View>
        </View>
    );
}

export default LogEntryListScreen;
