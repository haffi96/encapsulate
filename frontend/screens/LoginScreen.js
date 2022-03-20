import { useContext, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { login } from '../requests/login';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

const LoginScreen = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const { isLoading, register } = useContext(AuthContext);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>
                <Spinner visible={isLoading} />
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={async () => await login(email, password)}
                    style={styles.button}
                >
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={async () => await register(email, password)}
                    style={styles.button}
                >
                    <Text>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#383A59',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#BD93F9',
        width: '100%',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        marginVertical: 10

    },
});