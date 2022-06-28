import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#BD93F9',
    paddingTop: 25,
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
  expandedItem: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#282A36',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  itemTitle: {
    maxWidth: '80%',
    fontWeight: 'bold',
  },
  deleteButton: {
    position: 'absolute',
    right: 20,
  },
  infoButton: {
    position: 'absolute',
    right: 50,
  },
});

function Note(props) {
  const { title, deleteAction } = props;

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => setIsExpanded((value) => !value);

  let ExpandedView;
  if (isExpanded) {
    ExpandedView = (
      <View style={styles.expandedItem}>
        <Text>
          ExpandedView
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>{title}</Text>
        <TouchableOpacity style={styles.infoButton} onPress={toggleExpanded}>
          <MaterialCommunityIcons name="information-outline" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={deleteAction}>
          <MaterialCommunityIcons name="delete" size={20} />
        </TouchableOpacity>
      </View>
      {ExpandedView}
    </View>
  );
}

export default Note;
