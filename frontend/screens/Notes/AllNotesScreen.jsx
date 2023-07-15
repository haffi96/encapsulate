import {
    View, Text, TouchableOpacity, FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import Note from '../../components/Note';
import {
    retrieveNotesForUser, DeleteNoteForUser,
} from '../../services/collections';
import { auth } from '../../firebase';

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
        <View className="flex bg-purple flex-col bg-full h-full items-center">
            <View className="flex mt-10 w-5/6">
                <Text className="text-2xl font-bold text-center pb-5">Notes</Text>
                <FlatList
                    className="h-full"
                    data={noteItems}
                    keyExtractor={(item) => item.id}
                    renderItem={(item, index) => renderNoteItem(item, index)}
                    onRefresh={refreshNoteItems}
                    refreshing={isRefreshing}
                />
            </View>
            <View className="flex bg-accent p-5 rounded-3xl w-1/2 absolute bottom-20 items-center">
                <TouchableOpacity onPress={() => navigation.navigate('createNote')}>
                    <Text>New</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default AllNotesScreen;
