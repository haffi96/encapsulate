/* eslint-disable react/no-unescaped-entities */
import {
  Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Todo from '../components/Todo';
import { auth } from '../firebase';
import {
  retrieveTodosForUser, AddTodoForUser, DeleteTodoForUser, UpdateTodoForUser,
} from '../services/collections';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#383A59',
  },
  todosWrapper: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
    marginBottom: 75,
  },
  writeTodoWrapper: {
    position: 'absolute',
    padding: 10,
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 'auto',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    width: 250,
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginBottom: 2.5,
  },
  addText: {
  },
});

function TodoScreen() {
  const [todo, setTodo] = useState('');
  const [todoItems, setTodoItems] = useState([]);

  useEffect(async () => {
    const newTodos = await retrieveTodosForUser(auth.currentUser.uid);
    setTodoItems(newTodos);
  }, []);

  const handleAddTodo = async () => {
    const newTodoItem = {
      content: todo,
      date: Date.now(),
      completed: false,
    };
    const newDocID = await AddTodoForUser(auth.currentUser.uid, newTodoItem);
    newTodoItem.id = newDocID;
    setTodoItems([...todoItems, newTodoItem]);
    setTodo('');
    Keyboard.dismiss();
  };

  const handleKeyPress = () => {
    handleAddTodo();
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

  return (
    <View style={styles.container}>
      <View style={styles.todosWrapper}>
        <Text style={styles.sectionTitle}>Today's Todos</Text>
        <ScrollView style={styles.items}>
          {
            todoItems.map((todoItem, index) => (
              <View key={todoItem.id}>
                <Todo
                  text={todoItem.content}
                  status={todoItem.completed}
                  completeAction={() => completeTodo(todoItem.id, index)}
                  deleteAction={() => deleteTodo(todoItem.id, index)}
                />
              </View>
            ))
          }
        </ScrollView>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTodoWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder="Add a todo item..."
          value={todo}
          onChangeText={(text) => setTodo(text)}
          onSubmitEditing={() => handleKeyPress()}
          clearButtonMode="while-editing"
        />
        <TouchableOpacity onPress={() => handleAddTodo()}>
          <View style={styles.addWrapper}>
            <MaterialCommunityIcons name="plus" size={25} />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

export default TodoScreen;
