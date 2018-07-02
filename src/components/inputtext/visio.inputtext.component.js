import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  TextInput,
} from 'react-native';

export const VisioInputText = props => (
    <View style={styles.inputWrap}>
        <View style={styles.iconWrap}>
            <Image source={payload.icon} style={styles.icon} resizeMode="contain" />
        </View>
        <TextInput 
            autoCapitalize='none'
            keyboardType={props.payload.keyboardType} //'email-address'
            placeholder={props.payload.placeholder}
            placeholderTextColor="#FFF"
            underlineColorAndroid="transparent"
            style={styles.input} 
            secureTextEntry={props.payload.secureTextEntry}
         />
    </View>
)

const styles = StyleSheet.create({
    input: {
        flex: 1,
        paddingHorizontal: 10,
        color : "white"
    },
    inputWrap: {
        flexDirection: "row",
        marginVertical: 10,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC"
      },
      iconWrap: {
        paddingHorizontal: 7,
        alignItems: "center",
        justifyContent: "center",
      },
      icon: {
        height: 20,
        width: 20,
      },
})
