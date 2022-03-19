import React, { createContext, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    async function register(email, password) {
        setIsLoading(true);
        axios
        .post('http://10.62.71.138:8001/users/', {
        email,
        password,
        }).then(res => {
            let userInfo = res.data;
            setUserInfo(userInfo)
            setIsLoading(false)
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
          })
            .catch(e => {
              console.log(`register error: ${e}`)
              setIsLoading(false)
            });
    };

    return <AuthContext.Provider
        value={{
            isLoading,
            userInfo,
            register
            }}>
        {children}
    </AuthContext.Provider>
}