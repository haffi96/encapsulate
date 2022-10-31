import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import Note from "../../components/Note";
import { deleteNoteReq, getAllNotes } from "../../services/notes";
import { getItemFromAsyncStorage } from "../../services/storage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#383A59",
  },
  notesWrapper: {
    paddingTop: 80,
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 20,
    height: "95%",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    width: 250,
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  newNote: {
    backgroundColor: "#BD93F9",
    width: "50%",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    position: "absolute",
    marginBottom: 30,
    bottom: 0,
    marginLeft: 100,
  },
  touchable: {
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});

function AllNotesScreen({ props, navigation }) {
  const [noteItems, setNoteItems] = useState([]);
  const [userID, setUserID] = useState([]);
  const isFocused = useIsFocused();

  useEffect(async () => {
    const userIdFromStorage = await getItemFromAsyncStorage("@account_id");
    setUserID(userIdFromStorage);
    if (isFocused) {
      const notes = await getAllNotes(userID);
      setNoteItems(notes);
    }
  }, [props, isFocused]);

  const deleteNote = async (note_uuid, index) => {
    const itemsCopy = [...noteItems];
    await deleteNoteReq(note_uuid);
    itemsCopy.splice(index, 1);
    setNoteItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <View style={styles.notesWrapper}>
        <Text style={styles.sectionTitle}>All notes</Text>
        <ScrollView style={styles.items}>
          {noteItems.map((noteItem, index) => (
            <TouchableOpacity
              key={noteItem.id}
              onPress={() =>
                navigation.navigate("note", {
                  noteItem,
                  index,
                })
              }
            >
              <Note
                title={noteItem.title}
                body={noteItem.body}
                deleteAction={() => deleteNote(noteItem.note_uuid, index)}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.newNote}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() =>
            navigation.navigate("createNote", {
              userID,
            })
          }
        >
          <Text>New</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default AllNotesScreen;
