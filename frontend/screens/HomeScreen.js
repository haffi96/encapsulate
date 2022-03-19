import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AuthContext } from '../context/AuthContext';

const HomeScreen = () => {
  const val = useContext(AuthContext);

  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})