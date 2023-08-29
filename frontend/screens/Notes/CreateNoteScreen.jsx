import {
    Text, View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TextInput,
    Keyboard,
    KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';
import { AddNoteForUser } from '../../services/apiRequests';
import { useAuth } from '../../context/AuthContext';

function CreateNoteScreen({ navigation }) {
    const { authState } = useAuth();

    const [newNoteBody, setNewNoteBody] = useState('');
    const [newTitle, setNewTitle] = useState('Title');

    const handleAddNote = async (newNoteData, newTitleData) => {
        const newNoteItem = {
            title: newTitleData,
            body: newNoteData,
        };
        AddNoteForUser(authState.token, newNoteItem);
        Keyboard.dismiss();
    };

    const onCreate = () => {
        handleAddNote(newNoteBody, newTitle);
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
                        value={newTitle}
                        onChangeText={(text) => setNewTitle(text)}
                        multiline
                        autoFocus
                    />
                    <TextInput
                        className="px-5 text-white text-lg h-1/2"
                        value={newNoteBody}
                        onChangeText={(text) => setNewNoteBody(text)}
                        multiline
                        placeholder="Add notes here..."
                        placeholderTextColor="white"
                        autoFocus
                    />
                    <View className="bg-accent w-1/2 m-auto h-10 justify-center items-center rounded-2xl">
                        <TouchableOpacity onPress={onCreate}>
                            <Text>Create</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

export default CreateNoteScreen;
