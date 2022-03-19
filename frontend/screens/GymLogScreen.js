import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const GymLogScreen = () => {
  return (
    <View style={styles.container}>
      <Text>GymLogScreen</Text>
    </View>
  )
}

export default GymLogScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#383A59',
    }
})