import {
    Text, View, Animated,
} from 'react-native';
import React from 'react';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

function Routine(props) {
    const {
        routineName, deleteAction,
    } = props;

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
                <View className="flex flex-col bg-accent p-5 rounded-3xl mb-5">
                    <View>
                        <Text className="font-bold">{routineName}</Text>
                    </View>
                </View>
            </Swipeable>
        </GestureHandlerRootView>
    );
}

export default Routine;
