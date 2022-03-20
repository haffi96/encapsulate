import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const Task = (props) => {
  return (
    <View style={styles.item}>
        <View style={styles.itemsLeft}>
            <View style={styles.square}></View>
            <Text style={styles.itemText}>{props.text}</Text>
        </View>
        <View style={styles.circular}>

        </View>
    </View>
  )
}

export default Task

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#BD93F9',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemsLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#383A59',
        opacity: 0.8,
        borderRadius: 5,
        marginRight: 15
    },
    itemText: {
        maxWidth: '80%',
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#383A59',
        borderWidth: 2,
        borderRadius: 5
    },
});