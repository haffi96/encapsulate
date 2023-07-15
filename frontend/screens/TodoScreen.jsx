/* eslint-disable react/no-unescaped-entities */
import {
  Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';
import Todo from '../components/Todo';
import { auth } from '../firebase';
import {
  retrieveTodosForUser, AddTodoForUser, DeleteTodoForUser, UpdateTodoForUser,
} from '../services/collections';
import defaultScheme from '../colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultScheme.background,
  },
  todosWrapper: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 10,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  input: {
    padding: 20,
    backgroundColor: defaultScheme.background,
    color: 'white',
    width: 300,
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: defaultScheme.background,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },
});

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
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.todosWrapper}>
          <Text style={styles.sectionTitle}>Todos</Text>
          <FlatList
            data={todoItems}
            keyExtractor={(item) => item.id}
            renderItem={(item, index) => renderTodoItem(item, index)}
            onRefresh={refreshTodoItems}
            refreshing={isRefreshing}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Add a todo item..."
            value={todo}
            onChangeText={(text) => setTodo(text)}
            onSubmitEditing={() => handleAddTodo()}
            clearButtonMode="while-editing"
          />
          <View style={styles.addWrapper}>
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
