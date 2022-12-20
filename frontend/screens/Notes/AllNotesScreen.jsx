import {
  StyleSheet, View, Text, TouchableOpacity, FlatList,
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
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 10,
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
  newButton: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

function AllNotesScreen({ props, navigation }) {
  const [noteItems, setNoteItems] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getNotes = async () => {
      const newNotes = await retrieveNotesForUser(auth.currentUser.uid);
      setNoteItems(newNotes);
    };

    if (isFocused) {
      getNotes();
    }
  }, [props, isFocused]);

  const deleteNote = async (docID, index) => {
    const itemsCopy = [...noteItems];
    await DeleteNoteForUser(auth.currentUser.uid, docID);
    itemsCopy.splice(index, 1);
    setNoteItems(itemsCopy);
  };

  const renderNoteItem = ({ item, index }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => navigation.navigate('note', {
        noteItem: item,
        index,
      })}
    >
      <Note
        title={item.title}
        content={item.content}
        deleteAction={() => deleteNote(item.id, index)}
      />
    </TouchableOpacity>
  );

  const refreshNoteItems = async () => {
    const newNotes = await retrieveNotesForUser(auth.currentUser.uid);
    setIsRefreshing(true);
    setNoteItems(newNotes);
    setIsRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.notesWrapper}>
        <Text style={styles.sectionTitle}>Notes</Text>
        <FlatList
          data={noteItems}
          keyExtractor={(item) => item.id}
          renderItem={(item, index) => renderNoteItem(item, index)}
          onRefresh={refreshNoteItems}
          refreshing={isRefreshing}
        />
      </View>
      <View style={styles.newNote}>
        <TouchableOpacity style={styles.newButton} onPress={() => navigation.navigate('createNote')}>
          <Text>New</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default AllNotesScreen;
