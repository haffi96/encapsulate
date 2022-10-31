import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "../services/users";
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#383A59",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#BD93F9",
    width: "100%",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginVertical: 10,
  },
});

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Get user access token from async storage
    const fetchData = async () => {
      const allkeys = await AsyncStorage.getAllKeys();
      console.log(allkeys);
      const value = await AsyncStorage.getItem("@access_token");
      return value;
    };

    try {
      fetchData().then((value) => {
        if (value !== null) {
          navigation.navigate("Home");
          console.log("Successfully logged in");
        } else {
          navigation.navigate("Login");
        }
      });
    } catch (e) {
      console.log("Failed to get token");
      navigation.navigate("Login");
    }
  }, [loggedIn]);

  const handleSignUp = () => {
    registerWithEmailAndPassword(email, password)
      .then((user) => {
        const newUser = user;
        console.log(newUser);
        // Add user access token to async storage
        AsyncStorage.setItem("@account_uuid", `${user.account_user_uuid}`);
        AsyncStorage.setItem("@account_id", `${user.id}`);
        AsyncStorage.setItem("@access_token", "fake_token");
        // On success, autoadd doc for notes, todo, and gymlog
      })
      .catch((error) => alert(error.message));
  };

  const handleSignIn = async () => {
    loginWithEmailAndPassword(email, password)
      .then((user) => {
        // Update user access token in async storage
        AsyncStorage.setItem("@account_uuid", `${user.account_user_uuid}`);
        AsyncStorage.setItem("@account_id", `${user.id}`);
        AsyncStorage.setItem("@access_token", "fake_token");
        console.log(`Logged in with user: ${user.id}`);
        setLoggedIn(true);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            clearButtonMode="while-editing"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
            clearButtonMode="while-editing"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSignIn} style={styles.button}>
            <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default LoginScreen;
