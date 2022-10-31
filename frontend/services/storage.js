import AsyncStorage from "@react-native-async-storage/async-storage";

export const getItemFromAsyncStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch {
    alert("Failed to get item from storge");
  }
};
