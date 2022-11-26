import {
  StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, TextInput, Keyboard, KeyboardAvoidingView
} from 'react-native';
import React, { useState } from 'react';
import { AddNoteForUser } from '../../services/collections';
import { auth } from '../../firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#383A59',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 90,
  },
  createNote: {
    backgroundColor: '#BD93F9',
    width: '50%',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    position: 'absolute',
    marginBottom: 30,
    bottom: 0,
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
  const [newContent, setNewContent] = useState('');
  const [newTitle, setNewTitle] = useState('Title');

  const handleAddNote = async (contentData, titleData) => {
    const newNoteItem = {
      content: contentData,
      date: Date.now(),
      title: titleData,
    };
    AddNoteForUser(auth.currentUser.uid, newNoteItem);
    Keyboard.dismiss();
  };

  const onCreate = () => {
    handleAddNote(newContent, newTitle);
    navigation.navigate('allNotes');
  };

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}
    >
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View style={styles.innerContainer}>
            <TextInput
              style={styles.titleInput}
              value={newTitle}
              onChangeText={(text) => setNewTitle(text)}
              multiline
              autoFocus
            />
            <TextInput
              style={styles.input}
              value={newContent}
              onChangeText={(text) => setNewContent(text)}
              multiline
              placeholder='Add notes here...'
              placeholderTextColor={'white'}
              autoFocus
            />
            <View style={styles.createNote}>
              <TouchableOpacity style={styles.touchable} onPress={onCreate}>
                <Text>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
  );
}

export default CreateNoteScreen;
