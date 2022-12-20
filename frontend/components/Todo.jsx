import {
  StyleSheet, Text, View, TouchableOpacity, Animated,
} from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Swipeable } from 'react-native-gesture-handler';
import { UpdateTodoForUser } from '../services/collections';
import { auth } from '../firebase';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#BD93F9',
    padding: 20,
    borderRadius: 20,
    justifyContent: 'space-between',
    marginBottom: 2,
    shadowColor: '#282A36',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#383A59',
    opacity: 0.8,
    borderRadius: 5,
    marginRight: 15,
  },
  squareComplete: {
    width: 24,
    height: 24,
    backgroundColor: '#383A59',
    opacity: 0.8,
    borderRadius: 5,
    marginRight: 15,
    alignItems: 'center',
  },
  itemText: {
    maxWidth: '80%',
  },
  lineThroughItemText: {
    maxWidth: '80%',
    fontStyle: 'italic',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: 'black',
  },
  deleteButton: {
    position: 'absolute',
    right: 20,
  },
  infoButton: {
    backgroundColor: '#fff',
    position: 'absolute',
    right: 50,
    padding: 10,
  },
  expandedItem: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#282A36',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  reminderButton: {
    backgroundColor: '#c39df9',
    padding: 5,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 10,
  },
  reminderText: {
    textAlign: 'center',
  },
});

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
      <View style={styles.expandedItem}>
        <TouchableOpacity style={styles.reminderButton}>
          <Text style={styles.reminderText}>
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
    <Swipeable renderRightActions={renderAction} onSwipeableOpen={deleteAction}>
      <View>
        <TouchableOpacity style={styles.container} onPress={toggleExpanded}>
          <View style={styles.item}>
            <View style={styles.itemsLeft}>
              <TouchableOpacity
                style={todo.completed ? styles.squareComplete : styles.square}
                onPress={completeAction}
              >
                <View>
                  {todo.completed ? <MaterialCommunityIcons name="check" size={20} color="white" /> : null}
                </View>
              </TouchableOpacity>
              <Text
                style={todo.completed ? styles.lineThroughItemText : styles.itemText}
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
  );
}

export default Todo;
