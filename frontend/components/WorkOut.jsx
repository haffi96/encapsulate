import {
  StyleSheet, Text, View, Animated,
} from 'react-native';
import React from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import colorScheme from '../colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: colorScheme.accent,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    marginBottom: 5,
    shadowColor: colorScheme.shadowDark,
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
    routineName, date, deleteAction,
  } = props;

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
          <Text style={styles.itemTitle}>{routineName}</Text>
          <Text>{convertToDate(date)}</Text>
        </View>
      </View>
    </Swipeable>
  );
}

export default WorkOut;
