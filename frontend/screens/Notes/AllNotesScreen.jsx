import { StyleSheet, View } from 'react-native';
import React from 'react';
import Note from '../../components/Note';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#383A59',
  },
});

function AllNotesScreen() {
  return (
    <View style={styles.container}>
      <Note />
    </View>
  );
}

export default AllNotesScreen;
