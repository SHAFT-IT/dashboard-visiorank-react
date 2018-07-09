import React from 'react'
import { Text } from 'react-native'

export default function ({ item }) {
  return (
    <Text>{item.nom} {item.prenom}</Text>
  )
}