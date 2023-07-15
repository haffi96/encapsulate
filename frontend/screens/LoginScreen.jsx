import React, { useState } from 'react';
import {
    KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View,
    TouchableWithoutFeedback, Keyboard, Platform,
} from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { autoAddDoc } from '../services/collections';

function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const { user } = userCredential;
                console.log('Registered with:', user.email);
                autoAddDoc(user.uid);
            })
            .catch((error) => alert(error.message));
    };

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const { user } = userCredential;
                console.log('Logged in with:', user.uid);
                navigation.navigate('LoggedIn');
            })
            .catch((error) => alert(error.message));
    };

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}
        >
            <KeyboardAvoidingView
                className="flex h-full justify-center items-center bg-purple"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View className="w-4/5 space-y-3">
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        className="bg-zinc-900 p-3 rounded-full text-white"
                        clearButtonMode="while-editing"
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        className="bg-zinc-900 p-3 rounded-full text-white"
                        secureTextEntry
                        clearButtonMode="while-editing"
                    />
                </View>
                <View className="w-2/3 mt-10 space-y-2">
                    <TouchableOpacity
                        onPress={handleSignIn}
                        className="bg-accent p-4 rounded-3xl items-center"
                    >
                        <Text>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleSignUp}
                        className="bg-accent p-4 rounded-3xl items-center"
                    >
                        <Text>Register</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

export default LoginScreen;
