import React, {
    createContext, useContext, useState, useEffect,
} from 'react';
import * as SecureStore from 'expo-secure-store';
import { useMemo } from 'react/cjs/react.development';

const TOKEN_KEY = 'token';
const USER_UUID_KEY = 'user_uuid';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const apiUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

    const [authState, setAuthState] = useState(
        { token: null, authenticated: false, userUuid: null },
    );

    useEffect(() => {
        const loadToken = async () => {
            try {
                const token = await SecureStore.getItemAsync(TOKEN_KEY);
                const userUuid = await SecureStore.getItemAsync(USER_UUID_KEY);
                if (token) {
                    setAuthState({ token, authenticated: true, userUuid });
                }
            } catch (error) {
                console.log(error);
            }
        };
        loadToken();
    }, []);

    const register = async (email, password) => {
        try {
            const response = await fetch(`${apiUrl}user/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    first_name: 'test', last_name: 'user', email, password,
                }),
            });
            return await response.text();
        } catch (error) {
            return error;
        }
    };

    const login = async (email, password) => {
        const userInput = new FormData();
        userInput.append('username', email);
        userInput.append('password', password);
        console.log(`${apiUrl}token`);
        try {
            const response = await fetch(`${apiUrl}token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: userInput,
            });
            const data = await response.json();
            if (data.access_token) {
                await SecureStore.setItemAsync(TOKEN_KEY, data.access_token);
                await SecureStore.setItemAsync(USER_UUID_KEY, data.user_uuid);
                setAuthState(
                    { token: data.access_token, authenticated: true, userUuid: data.user_uuid },
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
            await SecureStore.deleteItemAsync(USER_UUID_KEY);
            setAuthState({ token: null, authenticated: false });
        } catch (error) {
            console.log(error);
        }
    };

    const CachedValue = useMemo(() => ({
        onRegister: register, onLogin: login, onLogout: logout, authState,
    }), [authState]);

    return (
        <AuthContext.Provider value={CachedValue}>
            {children}
        </AuthContext.Provider>
    );
}
