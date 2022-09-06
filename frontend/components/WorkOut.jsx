import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React from 'react';
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
    justifyContent: 'space-between',
  },
  itemTitle: {
    maxWidth: '80%',
    fontWeight: 'bold',
  },
  deleteButton: {
    position: 'absolute',
    right: 20,
  },
});

const convertToDate = (timeStamp) => {
  const d = new Date(timeStamp);
  return d.toDateString();
};

function WorkOut(props) {
  const {
    name, category, date, deleteAction,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>{name}</Text>
        <Text>{category}</Text>
        <Text>{convertToDate(date)}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={deleteAction}>
          <MaterialCommunityIcons name="delete" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default WorkOut;
