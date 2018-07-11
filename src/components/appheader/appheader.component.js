import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './appheader.style';
import { DrawerActions } from 'react-navigation';
import { NAVIGATION_TYPE_BACK } from '../../commons/constant';
import Icon from 'react-native-vector-icons/FontAwesome';

export const AppHeader = ({navigation, type, onClickBack}) => (
    
    <View style={styles.parent}>
        <View style={styles.headercontainerone}>

            <Image
                style={styles.logo}
                source={require('../../assets/images/logo_visiorank.png')}
                resizeMode='cover'/>

            {type === NAVIGATION_TYPE_BACK ? 
                
                <TouchableOpacity
                    style={styles.touchableright}
                    activeOpacity = { .5 } 
                    onPress={() => onClickBack() }>
                
                    <Icon
                        name='arrow-left'
                        style={styles.iconright}
                        />
                    
                </TouchableOpacity>

                : 
                
                <TouchableOpacity
                    style={styles.touchableright}
                    activeOpacity = { .5 } 
                    onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }>
                
                    <Icon
                        name='align-justify'
                        style={styles.iconright}
                        />
                    
                </TouchableOpacity>
                
                }    

            
        </View>
        

    </View>

)

