import {
  StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, TextInput, Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import { createNote } from '../../services/notes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#383A59',
  },
  saveNote: {
    backgroundColor: '#BD93F9',
    width: '50%',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    position: 'absolute',
    marginBottom: 30,
    bottom: 0,
    marginLeft: 100,
  },
  touchable: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#383A59',
    color: '#fff',
    width: '95%',
    height: '60%',
    borderRadius: 10,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  titleInput: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#383A59',
    color: '#fff',
    width: '95%',
    fontWeight: 'bold',
    fontSize: 25,
  },
});

function CreateNoteScreen({ navigation }) {
  const [newNoteBody, setNewNoteBody] = useState('');
  const [newTitle, setNewTitle] = useState('New Note');

  const handleAddNote = async (noteBodyData, titleData) => {
    const newNoteData = {
      body: noteBodyData,
      date: Date.now(),
      title: titleData,
    };
    // AddNoteForUser(auth.currentUser.uid, newNoteData);
    await createNote(newNoteData)
    Keyboard.dismiss();
  };

  const onCreate = () => {
    handleAddNote(newNoteBody, newTitle);
    navigation.navigate('allNotes');
  };

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.titleInput}
          value={newTitle}
          onChangeText={(text) => setNewTitle(text)}
          multiline
          autoFocus
        />
        <TextInput
          style={styles.input}
          value={newNoteBody}
          onChangeText={(text) => setNewNoteBody(text)}
          multiline
          autoFocus
        />
        <View style={styles.saveNote}>
          <TouchableOpacity style={styles.touchable} onPress={onCreate}>
            <Text>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default CreateNoteScreen;
