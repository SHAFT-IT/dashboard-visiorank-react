import React, { Component } from 'react'
import { Text, View, ScrollView, Image } from 'react-native';
import styles from './dashboard.style';
import AutoHeightImage from 'react-native-auto-height-image';
import AppheaderContainer from '../appheader/appheader.container';
import imagestat from '../../assets/images/stats.png';
import imagecall from '../../assets/images/calls.png';

export const Dashboard = () => (
    
    <View style={styles.parent}>

        <ScrollView style={styles.childtwo}>

            <Text style={styles.bigtitle}>Detail</Text>

            <View style={styles.submit}>
                    
                <View style={styles.containervisiteone}>
                    
                    <AutoHeightImage
                        style={styles.iconleft}
                        source={imagestat}
                        width={60}
                    />

                    <Text style={styles.topRightText}>5</Text>
                    <Text style={styles.bottomRightText}>visites</Text>

                </View>
                
                <View style={styles.containervisitetwo}>
                    
                </View> 

            </View>

            <View style={styles.submit}>
                    
                <View style={styles.containerappelone}>
                    
                    <AutoHeightImage
                        style={styles.iconleft}
                        source={imagecall}
                        width={50}
                    />

                </View>
                
                <View style={styles.containerappeltwo}>
                    
                </View> 

            </View>

        </ScrollView>

    </View>

)

//<AppheaderContainer/>