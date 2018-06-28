import React, { Component } from 'react'
import { Text, View, Image } from 'react-native';
import styles from './appheader.style';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';

export const AppHeader = () => (
    
    <View style={styles.parent}>
        <View style={styles.headercontainerone}>

            <Image
                style={styles.logo}
                source={require('../../assets/images/logo_visiorank.png')}
                resizeMode='cover'/>

            <Image
                style={styles.iconright}
                source={require('../../assets/images/menu_visio.png')}
                resizeMode='cover'
                />
                

        </View>
        <View style={styles.headercontainertwo}>

            <Text style={styles.headertextwhite}>Espace client :</Text>
            <Text style={styles.headertextorange}>02 22 06 99 03</Text>

        </View>

    </View>

)

