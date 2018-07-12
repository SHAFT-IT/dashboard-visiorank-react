import React, { Component } from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native'

export default class UserEditContainer extends Component{

    showPopupConfirm = () => {

        Alert.alert(
            'Alert Title',
            'My Alert Msg',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
        )

    }

    render() {

        return (
          <View style={styles.popcontainer}>
  
                <TouchableOpacity style={styles.touchcontainer} onPress={() => this.showPopupConfirm()}>
                    <Text>Popup</Text>
                </TouchableOpacity>

          </View>
          
        );
    }

}

const styles = StyleSheet.create({
    popcontainer: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    touchcontainer: {
        alignItems: "center",
        justifyContent: "center",
    }
});
  