import {
    Text, View, TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useAuth } from '../context/AuthContext';

const buttonStyle = 'bg-accent w-full p-5 rounded-3xl items-center my-5';

function HomeScreen({ navigation }) {
    const { onLogout } = useAuth();

    return (
        <View className="flex h-full justify-center items-center bg-purple">
            <View className="w-2/3">
                <TouchableOpacity
                    onPress={() => navigation.navigate('Notes')}
                    className={buttonStyle}
                >
                    <Text>Notes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Todo')}
                    className={buttonStyle}
                >
                    <Text>Todo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Gym')}
                    className={buttonStyle}
                >
                    <Text>Gym log</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onLogout}
                    className={buttonStyle}
                >
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default HomeScreen;
