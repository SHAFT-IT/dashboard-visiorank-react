
import React  from 'react'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'

export const VisioButton = () => (
    <TouchableOpacity activeOpacity={.5}>
        <View style={styles.button}>
            <Text style={styles.buttonText}>CONNEXION</Text>
        </View>
    </TouchableOpacity>
) 

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#f97f05",
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
    },  
})