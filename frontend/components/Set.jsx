import {
  StyleSheet, TextInput, View,
} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  input: {
    width: '30%',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#62669d',
    borderRadius: 2,
    height: '150%',
    marginHorizontal: 20,
  },
});

function Set() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="#"
        placeholderTextColor="#62669d"
        keyboardType="number-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="-"
        placeholderTextColor="#62669d"
        keyboardType="number-pad"
      />
    </View>
  );
}

export default Set;
