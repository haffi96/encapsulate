/* eslint-disable react/no-unescaped-entities */
import {
    Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View,
    TouchableWithoutFeedback,
    FlatList,
    Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';
import Todo from '../components/Todo';
import { auth } from '../firebase';
import {
    retrieveTodosForUser, AddTodoForUser, DeleteTodoForUser, UpdateTodoForUser,
} from '../services/collections';

function TodoScreen() {
    const [todo, setTodo] = useState('');
    const [todoItems, setTodoItems] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        const getTodos = async () => {
            const newTodos = await retrieveTodosForUser(auth.currentUser.uid);
            setTodoItems(newTodos);
        };

        if (isFocused) {
            getTodos();
        }
    }, [isFocused]);

    const handleAddTodo = async () => {
        const newTodoItem = {
            content: todo,
            date: Date.now(),
            completed: false,
            reminder: null,
        };
        const newDocID = await AddTodoForUser(auth.currentUser.uid, newTodoItem);
        newTodoItem.id = newDocID;
        setTodoItems([...todoItems, newTodoItem]);
        setTodo('');
        Keyboard.dismiss();
    };

    const completeTodo = async (docID, index) => {
        await UpdateTodoForUser(auth.currentUser.uid, docID, {
            completed: !todoItems[index].completed,
        });
        const newTodoItems = [...todoItems];
        newTodoItems[index].completed = !todoItems[index].completed;

        setTodoItems(newTodoItems);
    };

    const deleteTodo = async (docID, index) => {
        const itemsCopy = [...todoItems];
        await DeleteTodoForUser(auth.currentUser.uid, docID);
        itemsCopy.splice(index, 1);
        setTodoItems(itemsCopy);
    };

    const renderTodoItem = ({ item, index }) => (
        <View key={item.id}>
            <Todo
                todo={item}
                completeAction={() => completeTodo(item.id, index)}
                deleteAction={() => deleteTodo(item.id, index)}
            />
        </View>
    );

    const refreshTodoItems = async () => {
        const newTodos = await retrieveTodosForUser(auth.currentUser.uid);
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
                className="flex bg-purple h-full"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View className="flex p-5 h-2/3">
                    <Text className="text-xl font-bold text-center pb-5">Todos</Text>
                    <FlatList
                        data={todoItems}
                        keyExtractor={(item) => item.id}
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
