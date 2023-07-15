import {
    Text, View, TouchableOpacity, Animated,
} from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { UpdateTodoForUser } from '../services/collections';
import { auth } from '../firebase';

function Todo(props) {
    const {
        todo, deleteAction, completeAction,
    } = props;

    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpanded = () => setIsExpanded((value) => !value);

    const [reminderTime, setreminderTime] = useState(new Date(Date.now()));

    const onReminderTimeChange = async (_event, selectedDate) => {
        await UpdateTodoForUser(auth.currentUser.uid, todo.id, {
            reminder: reminderTime.getTime(),
        });
        setreminderTime(selectedDate);
    };

    let ExpandedView;
    if (isExpanded) {
        ExpandedView = (
            <View className="p-5 items-center justify-between rounded-2xl">
                <TouchableOpacity className="bg-customAccentSecondary p-5 rounded-xl flex flex-row justify-center items-center">
                    <Text>
                        Reminder
                    </Text>
                    <DateTimePicker
                        value={reminderTime}
                        mode="time"
                        is24Hour
                        onChange={onReminderTimeChange}
                    />
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
                <View>
                    <TouchableOpacity
                        className="flex flex-col bg-accent p-5 border rounded-3xl mb-1"
                        onPress={toggleExpanded}
                    >
                        <View className="flex flex-row justify-between">
                            <View className="flex flex-row items-center">
                                <TouchableOpacity
                                    className="w-6 h-6 bg-purple opacity-1 border rounded-lg items-center mr-2"
                                    onPress={completeAction}
                                >
                                    <View>
                                        {todo.completed ? <MaterialCommunityIcons name="check" size={20} color="white" /> : null}
                                    </View>
                                </TouchableOpacity>
                                <Text
                                    className={todo.completed ? 'italic line-through decoration-solid text-black' : ''}
                                >
                                    {todo.content}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={deleteAction}>
                                <MaterialCommunityIcons name="delete" size={20} />
                            </TouchableOpacity>
                        </View>
                        {ExpandedView}
                    </TouchableOpacity>
                </View>
            </Swipeable>
        </GestureHandlerRootView>
    );
}

export default Todo;
