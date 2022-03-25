import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#383A59',
  },
});

function NoteScreen() {
  return (
    <View style={styles.container}>
      <Text>NoteScreen</Text>
    </View>
  );
}

export default NoteScreen;
