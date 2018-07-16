import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
    container: {
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10
    },
    iconLeft: {
      marginLeft: 8,
      marginRight: 8,
      fontSize: 20,
      color: '#444',
      width: 24
    },
    text: {
      color: '#444',
      fontSize: 16
    }
})

export default ({ item }) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.text}>{item.priorite_libelle}</Text>
      </View>
    </TouchableOpacity>
  )
}
