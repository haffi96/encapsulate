import {
  StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import { updateNoteReq } from '../../services/notes';

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

function NoteScreen({ route, navigation }) {
  const { noteItem, index } = route.params;

  const [noteBodyCopy, setNoteBodyCopy] = useState(noteItem.body);
  const [titleCopy, setTitleCopy] = useState(noteItem.title);

  const updateNote = async (noteBody, titleData) => {
    noteItem.body = noteBody;
    noteItem.title = titleData;
    await updateNoteReq(noteItem);
  };

  const onSave = () => {
    updateNote(noteBodyCopy, titleCopy, index);
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
          value={titleCopy}
          onChangeText={(text) => setTitleCopy(text)}
          multiline
          autoFocus
        />
        <TextInput
          style={styles.input}
          value={noteBodyCopy}
          onChangeText={(text) => setNoteBodyCopy(text)}
          multiline
          autoFocus
        />
        <View style={styles.saveNote}>
          <TouchableOpacity style={styles.touchable} onPress={onSave}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default NoteScreen;
