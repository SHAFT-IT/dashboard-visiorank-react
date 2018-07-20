import React, { Component } from 'react'
import {View, Platform, TextInput, ScrollView, Text, Alert, StyleSheet, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Loader from '../../loader/Loader';
import { fetchSites } from '../../../store/actions/sites.action';
import { NavigationActions } from 'react-navigation'
var FilePickerManager = require('NativeModules').FilePickerManager;
 
export default class UserEditContainer extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
            file: null
        };

    }

    componentDidMount() {
        
    }

    selectFileTapped = () => {

        if (Platform.OS === 'android') {
            const options = {
                title: 'File Picker',
                chooseFileButtonTitle: 'Choose File...'
            };
        
            FilePickerManager.showFilePicker(options, (response) => {
                console.log('Response = ', response);
        
                if (response.didCancel) {
                    console.log('User cancelled photo picker');
                }
                else if (response.error) {
                    console.log('ImagePickerManager Error: ', response.error);
                }
                else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                }
                else {
                    this.setState({
                        file: response
                    });
                }
            });
      
        }else if (Platform.OS === 'ios') {
            //for ios
        }

    }
    
    render() {

        return (
          
            <View style={{ flex: 1}}> 

                <TouchableHighlight
                    style={styles.containericontop}
                    underlayColor='transparent'
                    onPress={() => this.selectFileTapped()}>
                    <Icon name="chevron-circle-left" style={styles.icontop}/>
                </TouchableHighlight>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                    {this.state.file && typeof this.state.file === 'object' ? 
                        <Text>{JSON.stringify(this.state.file)}</Text> :
                        <Text>Your file detail appear here</Text> 
                    }
                    
                </View>

            </View>
             

        );
    }

}

const styles = StyleSheet.create({
    edittext: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
        height: 45,
        borderRadius: 6,
        borderWidth: 1,
        paddingLeft: 15,
        borderColor: '#939393',
    },
    
    scrollcontent: {
        marginTop: 17,
    },
    
    icontop: {
        fontSize: 45,
        color: 'grey',
    
    },

    containericontop: {
        position: 'absolute',
        top: 10,
        left: 20,
        alignItems: "center",
        justifyContent: "center",
        width: 45,
        height: 45
    },
    
    buttonSubmit: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 50,
        borderRadius: 6,
        paddingLeft: 15,
        backgroundColor: 'green',
        alignItems: "center",
        justifyContent: "center",
    },

    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    bigtitle: {
        textAlign: 'center',
        color: '#939393',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    }
});
  