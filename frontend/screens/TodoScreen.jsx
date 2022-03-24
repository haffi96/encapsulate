/* eslint-disable react/no-unescaped-entities */
import {
  Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View,
  StyleSheet,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Task from '../components/Task';
import { auth } from '../firebase';
import {
  retrieveTodosForUser, AddTodoForUser, DeleteTodoForUser, UpdateTodoForUser,
} from '../services/collections';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#383A59',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
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
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
  },
});

function TodoScreen() {
  const [todo, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);

  useEffect(async () => {
    const newTodos = await retrieveTodosForUser(auth.currentUser.uid);
    setTaskItems(newTodos);
  }, []);

  const handleAddTask = async () => {
    const newTaskItem = {
      content: todo,
      date: Date.now(),
      completed: false,
    };
    const newDocID = await AddTodoForUser(auth.currentUser.uid, newTaskItem);
    newTaskItem.id = newDocID;
    setTaskItems([...taskItems, newTaskItem]);
    setTask('');
    Keyboard.dismiss();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const completeTask = async (docID, index) => {
    await UpdateTodoForUser(auth.currentUser.uid, docID, {
      completed: !taskItems[index].completed,
    });
    const newTaskItems = [...taskItems];
    newTaskItems[index].completed = !taskItems[index].completed;

    setTaskItems(newTaskItems);
    // TODO: Strike through text on complete
  };

  const deleteTask = async (docID, index) => {
    const itemsCopy = [...taskItems];
    await DeleteTodoForUser(auth.currentUser.uid, docID);
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <View style={styles.items}>
          {
            taskItems.map((taskItem, index) => (
              <TouchableOpacity key={taskItem.id} onPress={() => completeTask(taskItem.id, index)}>
                <Task
                  text={taskItem.content}
                  status={taskItem.completed}
                  userId={auth.currentUser.uid}
                  deleteAction={() => deleteTask(taskItem.id, index)}
                />
              </TouchableOpacity>
            ))
          }
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder="Write a task" value={todo} onChangeText={(text) => setTask(text)} onKeyPress={(e) => handleKeyPress(e)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

export default TodoScreen;
