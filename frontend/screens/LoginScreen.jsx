import React, { useState } from 'react';
import {
    KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View,
    TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useAuth } from '../context/AuthContext';

GoogleSignin.configure({
    iosClientId: '833868032143-u1rq2g0uec5c4a5bcd6l5rgpirimn5h2.apps.googleusercontent.com',
});

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { onRegister, onLogin, onGoogleLogin } = useAuth();

    const handleSignIn = async () => {
        const result = await onLogin(email, password);
        if (result && result.error) {
            alert(result.msg);
        }
    };

    const handleGoogleSignIn = async () => {
        const userInfo = await GoogleSignin.signIn();
        // Send req to backend and get access token
        await onGoogleLogin(userInfo.user.email, userInfo.idToken);
    };

    const handleSignUp = async () => {
        const result = await onRegister(email, password);
        if (result && result.error) {
            alert(result.msg);
        } else {
            handleSignIn();
        }
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

                    <View className="items-center">
                        <Text className="text-white">____________</Text>
                        <Text />
                        <TouchableOpacity
                            onPress={handleGoogleSignIn}
                            className="flex flex-row w-full p-2 bg-googleSignIn rounded-3xl space-x-2"
                        >
                            <View className="ml-5">
                                <GoogleSigninButton
                                    size={GoogleSigninButton.Size.Icon}
                                />
                            </View>
                            <Text className="text-white m-auto font-roboto">Sign in with Google</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

export default LoginScreen;
