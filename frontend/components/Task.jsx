import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#BD93F9',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    marginBottom: 5,
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
    backgroundColor: 'green',
    opacity: 0.8,
    borderRadius: 5,
    marginRight: 15,
    alignItems: 'center',
  },
  itemText: {
    maxWidth: '80%',
  },
  x: {
    padding: 8,
  },
  lineThroughItemText: {
    maxWidth: '80%',
    fontStyle: 'italic',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: 'grey',
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
  dueButton: {
    backgroundColor: '#c39df9',
    padding: 5,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 10,
    marginTop: 5,
  },
});

function Task(props) {
  const {
    status, text, deleteAction, completeAction,
  } = props;

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => setIsExpanded((value) => !value);

  console.log(isExpanded);

  let ExpandedView;
  if (isExpanded) {
    ExpandedView = (
      <View style={styles.expandedItem}>
        <TouchableOpacity style={styles.reminderButton}>
          <View>
            <Text>Reminder</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dueButton}>
          <View>
            <Text>Due</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={toggleExpanded}>
        <View style={styles.item}>
          <View style={styles.itemsLeft}>
            <TouchableOpacity
              style={status ? styles.squareComplete : styles.square}
              onPress={completeAction}
            >
              <View>
                {status ? <MaterialCommunityIcons name="check" size={20} /> : null}
              </View>
            </TouchableOpacity>
            <Text style={status ? styles.lineThroughItemText : styles.itemText}>{text}</Text>
          </View>
          <TouchableOpacity onPress={deleteAction}>
            <MaterialCommunityIcons name="delete" size={20} />
          </TouchableOpacity>
        </View>
        {ExpandedView}
      </TouchableOpacity>
    </View>
  );
}

export default Task;
