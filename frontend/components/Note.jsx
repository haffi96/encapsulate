import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

function Note() {
  return (
    <View style={styles.container}>
      <Text>Note</Text>
    </View>
  );
}

export default Note;
