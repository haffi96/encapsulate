import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#BD93F9',
    padding: 50,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    shadowColor: '#282A36',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  itemTitle: {
    maxWidth: '80%',
    fontWeight: 'bold',
  },
});

function Note(props) {
  const { title, deleteAction } = props;
  return (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{title}</Text>
      <TouchableOpacity onPress={deleteAction}>
        <MaterialCommunityIcons name="delete" size={20} />
      </TouchableOpacity>
    </View>
  );
}

export default Note;
