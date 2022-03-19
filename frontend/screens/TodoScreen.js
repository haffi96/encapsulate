import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TodoScreen = () => {
  return (
    <View style={styles.container}>
      <Text>TodoScreen</Text>
    </View>
  )
}

export default TodoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#383A59',
    }
})