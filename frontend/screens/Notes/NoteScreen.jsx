import {
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
                        value={contentCopy}
                        onChangeText={(text) => setContentCopy(text)}
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
