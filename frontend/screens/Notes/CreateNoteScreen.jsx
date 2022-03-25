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

function CreateNoteScreen() {
  return (
    <View style={styles.container}>
      <Text>CreateNoteScreen</Text>
    </View>
  );
}

export default CreateNoteScreen;
