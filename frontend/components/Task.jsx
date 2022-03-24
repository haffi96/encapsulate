import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#BD93F9',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    shadowColor: '#282A36',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
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
  },
  itemText: {
    maxWidth: '80%',
  },
});

function Task(props) {
  const { status, text, deleteAction } = props;
  return (
    <View style={styles.item}>
      <View style={styles.itemsLeft}>
        <View style={status ? styles.squareComplete : styles.square} />
        <Text style={styles.itemText}>{text}</Text>
      </View>
      <TouchableOpacity>
        <Text onPress={deleteAction}>X</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Task;
