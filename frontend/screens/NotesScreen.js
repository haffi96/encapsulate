import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NotesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>NotesScreen</Text>
    </View>
  )
}

export default NotesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#383A59',
    }
})