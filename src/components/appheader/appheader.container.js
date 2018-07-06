import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './appheader.style';
import { DrawerActions } from 'react-navigation';
import { AppHeader } from './appheader.component';
import { NAVIGATION_TYPE_BACK, NAVIGATION_TYPE_MENU } from '../../commons/constant';

class AppheaderContainer extends Component{

    onClickBack = () => {

        this.props.navigation.goBack();

    }

    render() {

        const {navigation, type} = this.props;

        return (
        
            <AppHeader navigation={navigation} type={type} onClickBack={this.onClickBack} />

        );
    }

}
  
export default AppheaderContainer;
