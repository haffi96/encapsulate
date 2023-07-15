import {
  StyleSheet, Text, View, TouchableOpacity, Animated,
} from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Swipeable } from 'react-native-gesture-handler';
import defaultScheme from '../colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: defaultScheme.accent,
    padding: 25,
    borderRadius: 20,
    justifyContent: 'space-between',
    marginBottom: 2,
    shadowColor: defaultScheme.shadowDark,
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pinButton: {
    backgroundColor: defaultScheme.accentSecondary,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 10,
    marginTop: 10,
  },
  itemTitle: {
    maxWidth: '80%',
  },
  deleteButton: {
    position: 'absolute',
    right: 20,
  },
  infoButton: {
    position: 'absolute',
    right: 50,
  },
  rightAction: {
    backgroundColor: 'white',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

function Note(props) {
  const { title, deleteAction } = props;

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => setIsExpanded((value) => !value);

  let ExpandedView;
  if (isExpanded) {
    ExpandedView = (
      <TouchableOpacity style={styles.pinButton}>
        <MaterialCommunityIcons name="pin" size={20} />
      </TouchableOpacity>
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
    </Swipeable>
  );
}

export default Note;
