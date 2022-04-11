import {
  StyleSheet, View, Text, TouchableOpacity, ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import Note from '../../components/Note';
import {
  retrieveNotesForUser, DeleteNoteForUser,
} from '../../services/collections';
import { auth } from '../../firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#383A59',
  },
  notesWrapper: {
    paddingTop: 80,
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 20,
    height: '95%',
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 'auto',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    width: 250,
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  newNote: {
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
});

function AllNotesScreen({ props, navigation }) {
  const [noteItems, setNoteItems] = useState([]);
  const isFocused = useIsFocused();

  useEffect(async () => {
    if (isFocused) {
      const newNotes = await retrieveNotesForUser(auth.currentUser.uid);
      console.log(auth.currentUser.uid);
      setNoteItems(newNotes);
    }
  }, [props, isFocused]);

  const deleteNote = async (docID, index) => {
    const itemsCopy = [...noteItems];
    await DeleteNoteForUser(auth.currentUser.uid, docID);
    itemsCopy.splice(index, 1);
    setNoteItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <View style={styles.notesWrapper}>
        <Text style={styles.sectionTitle}>All notes</Text>
        <ScrollView style={styles.items}>
          {
            noteItems.map((noteItem, index) => (
              <TouchableOpacity
                key={noteItem.id}
                onPress={() => navigation.navigate('note', {
                  noteItem,
                  index,
                })}
              >
                <Note
                  title={noteItem.title}
                  content={noteItem.content}
                  deleteAction={() => deleteNote(noteItem.id, index)}
                />
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </View>
      <View style={styles.newNote}>
        <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate('createNote')}>
          <Text>New</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default AllNotesScreen;
