/* eslint-disable react/no-unescaped-entities */
import {
    Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View,
    TouchableWithoutFeedback,
    FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';
import Todo from '../components/Todo';
import {
    retrieveTodosForUser, AddTodoForUser, DeleteTodoForUser, UpdateTodoForUser,
} from '../services/collections';
import { useAuth } from '../context/AuthContext';

function TodoScreen() {
    const [todo, setTodo] = useState('');
    const [todoItems, setTodoItems] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const isFocused = useIsFocused();
    const { authState } = useAuth();

    useEffect(() => {
        const getTodos = async () => {
            const newTodos = await retrieveTodosForUser(authState.token);
            setTodoItems(newTodos);
        };

        if (isFocused) {
            getTodos();
        }
    }, [isFocused]);

    const handleAddTodo = async () => {
        const newTodoItem = {
            body: todo,
        };
        const newTodoUuid = await AddTodoForUser(authState.token, newTodoItem);
        newTodoItem.todo_uuid = newTodoUuid;
        setTodoItems([...todoItems, newTodoItem]);
        setTodo('');
        Keyboard.dismiss();
    };

    const completeTodo = async (todoUuid, index) => {
        await UpdateTodoForUser(authState.token, todoUuid, {
            completed: !todoItems[index].completed,
        });
        const newTodoItems = [...todoItems];
        newTodoItems[index].completed = !todoItems[index].completed;

        setTodoItems(newTodoItems);
    };

    const deleteTodo = async (todoUuid, index) => {
        const itemsCopy = [...todoItems];
        await DeleteTodoForUser(authState.token, todoUuid);
        itemsCopy.splice(index, 1);
        setTodoItems(itemsCopy);
    };

    const renderTodoItem = ({ item, index }) => (
        <View key={item.todo_uuid}>
            <Todo
                todo={item}
                completeAction={() => completeTodo(item.todo_uuid, index)}
                deleteAction={() => deleteTodo(item.todo_uuid, index)}
            />
        </View>
    );

    const refreshTodoItems = async () => {
        const newTodos = await retrieveTodosForUser(authState.token);
        setIsRefreshing(true);
        setTodoItems(newTodos);
        setIsRefreshing(false);
    };

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <KeyboardAvoidingView
                className="flex bg-purple h-full space-y-10"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View className="flex p-5 h-1/2">
                    <Text className="text-xl font-bold text-center pb-5">Todos</Text>
                    <FlatList
                        data={todoItems}
                        keyExtractor={(item) => item.todo_uuid}
                        renderItem={(item, index) => renderTodoItem(item, index)}
                        onRefresh={refreshTodoItems}
                        refreshing={isRefreshing}
                    />
                </View>

                <View className="flex flex-row p-10 items-center justify-center">
                    <TextInput
                        className="py-5 px-10 text-white border rounded-full w-full"
                        placeholder="Add a todo item..."
                        value={todo}
                        onChangeText={(text) => setTodo(text)}
                        onSubmitEditing={() => handleAddTodo()}
                        clearButtonMode="while-editing"
                    />
                    <View>
                        <TouchableOpacity onPress={() => handleAddTodo()}>
                            <MaterialCommunityIcons style={{ color: 'white' }} name="plus" size={40} />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

export default TodoScreen;
