import {
    Text, View, TouchableOpacity,
} from 'react-native';
import React from 'react';

const buttonStyle = 'bg-accent w-full p-5 rounded-3xl items-center my-5';

function GymLogScreen({ navigation }) {
    return (
        <View className="flex h-full justify-center items-center bg-purple">
            <View className="w-2/3">
                <TouchableOpacity
                    className={buttonStyle}
                    onPress={() => navigation.navigate('LogList')}
                >
                    <Text>LogScreen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={buttonStyle}
                    onPress={() => navigation.navigate('Routines')}
                >
                    <Text>RoutinesScreen</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default GymLogScreen;
