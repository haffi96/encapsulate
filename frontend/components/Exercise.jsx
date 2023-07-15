import {
    Text, View,
} from 'react-native';
import React from 'react';
import Set from './Set';

function Exercise(props) {
    const { exerciseItem } = props;

    const Sets = ({ count }) => (
        Array.from({ length: count }).map((index) => <Set key={index} />)
    );

    return (
        <View className="flex flex-col bg-accent border rounded-3xl mb-5 p-5">
            <Text className="text-center mb-2 font-semibold capitalize">
                {exerciseItem.exerciseName}
            </Text>
            <View>
                <View className="flex flex-row" />
                <Sets count={exerciseItem.sets} />
            </View>
        </View>
    );
}

export default Exercise;
