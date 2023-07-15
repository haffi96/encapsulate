import {
    TextInput, View,
} from 'react-native';
import React from 'react';

function Set() {
    return (
        <View className="flex flex-row justify-center pb-2 space-x-2">
            <TextInput
                className="w-1/3 text-center border border-b-1 border-t-0 border-l-0 border-r-0 border-customBorderBottom"
                placeholder="#"
                placeholderTextColor="#62669d"
                keyboardType="number-pad"
            />
            <TextInput
                className="w-1/3 text-center border border-b-1 border-t-0 border-l-0 border-r-0 border-customBorderBottom"
                placeholder="-"
                placeholderTextColor="#62669d"
                keyboardType="number-pad"
            />
        </View>
    );
}

export default Set;
