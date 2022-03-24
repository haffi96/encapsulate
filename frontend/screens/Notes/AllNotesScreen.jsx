import {
  StyleSheet, View, Text, TouchableOpacity, Keyboard,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Note from '../../components/Note';
import {
  retrieveNotesForUser, DeleteNoteForUser, AddNoteForUser,
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
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
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

function AllNotesScreen({ navigation }) {
  const [note, setNote] = useState('');
  const [noteItems, setNoteItems] = useState([]);

  useEffect(async () => {
    const newNotes = await retrieveNotesForUser(auth.currentUser.uid);
    console.log(auth.currentUser.uid);
    setNoteItems(newNotes);
  }, []);

  const handleAddNote = async () => {
    const newNoteItem = {
      content: note,
      date: Date.now(),
      title: 'New note',
    };
    const newDocID = await AddNoteForUser(auth.currentUser.uid, newNoteItem);
    newNoteItem.id = newDocID;
    setNoteItems([...noteItems, newNoteItem]);
    setNote('');
    Keyboard.dismiss();
  };

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
        <View style={styles.items}>
          {
            noteItems.map((noteItem, index) => (
              <TouchableOpacity key={noteItem.id} onPress={() => navigation.navigate('note')}>
                <Note
                  title={noteItem.title}
                  content={noteItem.content}
                  deleteAction={() => deleteNote(noteItem.id, index)}
                />
              </TouchableOpacity>
            ))
          }
        </View>
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
