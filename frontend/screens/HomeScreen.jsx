import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#383A59",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
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

function HomeScreen({ navigation }) {
  const handleSignOut = () => {
    // remove user access token from async storage
    // Send request to backend to remove auth
    AsyncStorage.removeItem("@access_token");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Notes")}
          style={styles.button}
        >
          <Text>Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Todo")}
          style={styles.button}
        >
          <Text>Todo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Gym")}
          style={styles.button}
        >
          <Text>Gym log</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeScreen;
