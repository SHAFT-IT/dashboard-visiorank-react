import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import { LockIcon, LogoIcon, PersonIcon } from '../../commons/images';
import { VisioButton } from '../button/visio.button.component';

const { width, height } = Dimensions.get("window");

export const Login = () => (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.container}>
            <View style={styles.markWrap}>
            <Image source={LogoIcon} style={styles.mark} resizeMode="contain" />
        </View>
        <View style={styles.wrapper}>
            <View style={styles.inputWrap}>
                <View style={styles.iconWrap}>
                    <Image source={PersonIcon} style={styles.icon} resizeMode="contain" />
                </View>
                <TextInput 
                    autoCapitalize='none'
                    keyboardType='email-address'
                    placeholder="Email" 
                    placeholderTextColor="#FFF"
                    underlineColorAndroid="transparent"
                    style={styles.input} />
        </View>
        
        <View style={styles.inputWrap}>
            <View style={styles.iconWrap}>
                <Image source={LockIcon} style={styles.icon} resizeMode="contain" />
            </View>
            <TextInput 
                underlineColorAndroid="transparent"
                placeholderTextColor="#FFF"
                placeholder="Mot de passe" 
                style={styles.input} 
                secureTextEntry 
          />
        </View>
        <VisioButton />
      </View>  
    </View>
  </KeyboardAvoidingView>
)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'black'
    },
    markWrap: {
      flex: 1,
      paddingVertical: 100,
    },
    mark: {
      width: null,
      height: null,
      flex: 1,
    },
    background: {
      width,
      height,
    },
    wrapper: {
      paddingVertical: 0,
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
    input: {
      flex: 1,
      paddingHorizontal: 10,
      color : "white"
    },
   
    signupWrap: {
      backgroundColor: "transparent",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    accountText: {
      color: "#D8D8D8"
    },
    signupLinkText: {
      marginVertical: 30,
      color: "#f97f05",
    }, 
  });





