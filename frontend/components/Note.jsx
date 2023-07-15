import {
    Text, View, TouchableOpacity, Animated,
} from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';

function Note(props) {
    const { title, deleteAction } = props;

    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpanded = () => setIsExpanded((value) => !value);

    let ExpandedView;
    if (isExpanded) {
        ExpandedView = (
            <View className="flex flex-row items-center justify-center">
                <TouchableOpacity className="p-5">
                    <MaterialCommunityIcons name="pin" size={20} />
                </TouchableOpacity>
            </View>
        );
    }

    const renderAction = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [-80, 0],
            outputRange: [1, 0],
        });

        return (
            <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }} />
        );
    };

    return (
        <GestureHandlerRootView>
            <Swipeable renderRightActions={renderAction} onSwipeableOpen={deleteAction}>
                <View className="flex flex-col bg-accent p-8 rounded-3xl justify-between mb-1">
                    <View className="flex flex-row">
                        <Text>{title}</Text>
                        <TouchableOpacity className="absolute right-10" onPress={toggleExpanded}>
                            <MaterialCommunityIcons name="information-outline" size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity className="absolute right-1" onPress={deleteAction}>
                            <MaterialCommunityIcons name="delete" size={20} />
                        </TouchableOpacity>
                    </View>
                    {ExpandedView}
                </View>
            </Swipeable>
        </GestureHandlerRootView>
    );
}

export default Note;
