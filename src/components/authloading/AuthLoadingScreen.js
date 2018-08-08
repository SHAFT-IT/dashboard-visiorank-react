import React, { Component } from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    View,
} from 'react-native'
import { getData } from '../../commons/preferences';

export default class AuthLoadingScreen extends Component{

    constructor(props) {
        super(props);
        
    }

    componentDidMount() {
        
        getData('user')
        .then((user) => {
            if (user && user.mobile_token) {
                console.log(`Preference in AuthLoadingScreen: `, user);  
                this.props.navigation.navigate('Home');
            }else{
                console.log('Preference in AuthLoadingScreen is null');  
                this.props.navigation.navigate('Authentification');
            }
            
        })
        .catch(error => console.log('Cannot get data with error ', error));

    }

    render() {

        return (

            <View style={styles.container}>
                <ActivityIndicator />
            </View>

        );

    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});