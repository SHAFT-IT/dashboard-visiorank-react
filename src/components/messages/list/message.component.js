import React from 'react'
import { Text, View, FlatList } from 'react-native';
import styles from './message.style';

export const Messages = ({ messages }) => (
    <View style={styles.container}>
        <FlatList
            data={ messages }
            renderItem = { ({ item }) => 
                <View style={styles.item}>
                    <Text style={styles.itemtext}>{ item.subject } - { item.udate }</Text>
                </View>
            }
        />
    </View>
)