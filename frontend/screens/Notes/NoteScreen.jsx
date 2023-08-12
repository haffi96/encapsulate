import {
    Text, TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Keyboard,
    KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';
import { UpdateNoteForUser } from '../../services/collections';
import { useAuth } from '../../context/AuthContext';

function NoteScreen({ route, navigation }) {
    const { authState } = useAuth();
    const { noteItem } = route.params;

    const [noteBodyCopy, setBodyCopy] = useState(noteItem.body);
    const [titleCopy, setTitleCopy] = useState(noteItem.title);

    const updateNote = async (noteBodyData, titleData) => {
        noteItem.body = noteBodyData;
        noteItem.title = titleData;
        UpdateNoteForUser(authState.token, noteItem.note_uuid, {
            body: noteBodyData,
            title: titleData,
        });
    };

    const onSave = () => {
        updateNote(noteBodyCopy, titleCopy);
        navigation.navigate('allNotes');
    };

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex bg-purple h-full"
            >
                <View className="flex flex-col h-4/5 space-y-2">
                    <TextInput
                        className="py-10 px-5 text-white font-bold text-xl"
                        value={titleCopy}
                        onChangeText={(text) => setTitleCopy(text)}
                        multiline
                        autoFocus
                    />
                    <TextInput
                        className="px-5 text-white text-lg h-1/2"
                        value={noteBodyCopy}
                        onChangeText={(text) => setBodyCopy(text)}
                        multiline
                        autoFocus
                    />
                    <View className="bg-accent w-1/2 m-auto h-10 justify-center items-center rounded-2xl">
                        <TouchableOpacity onPress={onSave}>
                            <Text>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

export default NoteScreen;
