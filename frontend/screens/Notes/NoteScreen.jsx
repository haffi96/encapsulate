import {
  StyleSheet,
  Text, TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { UpdateNoteForUser } from '../../services/collections';
import { auth } from '../../firebase';
import defaultScheme from '../../colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultScheme.background,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 90,
  },
  saveNote: {
    backgroundColor: defaultScheme.accent,
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
    backgroundColor: defaultScheme.background,
    color: '#fff',
    width: '95%',
    height: '60%',
  },
  titleInput: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: defaultScheme.background,
    color: '#fff',
    width: '95%',
    fontWeight: 'bold',
    fontSize: 25,
  },
});

function NoteScreen({ route, navigation }) {
  const { noteItem } = route.params;

  const [contentCopy, setContentCopy] = useState(noteItem.content);
  const [titleCopy, setTitleCopy] = useState(noteItem.title);

  const updateNote = async (contentData, titleData) => {
    const docID = noteItem.id;
    noteItem.content = contentData;
    noteItem.title = titleData;
    UpdateNoteForUser(auth.currentUser.uid, docID, {
      content: contentData,
      title: titleData,
    });
  };

  const onSave = () => {
    updateNote(contentCopy, titleCopy);
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
            value={titleCopy}
            onChangeText={(text) => setTitleCopy(text)}
            multiline
            autoFocus
          />
          <TextInput
            style={styles.input}
            value={contentCopy}
            onChangeText={(text) => setContentCopy(text)}
            multiline
            autoFocus
          />
          <View style={styles.saveNote}>
            <TouchableOpacity style={styles.touchable} onPress={onSave}>
              <Text>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default NoteScreen;
