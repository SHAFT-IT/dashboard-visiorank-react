import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native';
import styles from './dashboard.style';
import AppheaderContainer from '../appheader/appheader.container';

export const Dashboard = () => (
    
    <View style={styles.parent}>

        <AppheaderContainer/>

        <ScrollView style={styles.childtwo}>

            <Text style={styles.bigtitle}>Detail</Text>

            <View style={styles.submit}>
                    
                <View style={styles.containervisiteone}>
                    
                </View>
                
                <View style={styles.containervisitetwo}>
                    
                </View> 

            </View>

            <View style={styles.submit}>
                    
                <View style={styles.containerappelone}>
                    
                </View>
                
                <View style={styles.containerappeltwo}>
                    
                </View> 

            </View>

        </ScrollView>

    </View>

)
