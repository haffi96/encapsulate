import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.log(e);
    }
};

export const getData = async (key) => {
    const jsonValue = await AsyncStorage.getItem(key);
    return JSON.parse(jsonValue);
};
