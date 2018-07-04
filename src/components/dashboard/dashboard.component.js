import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native';
import styles from './dashboard.style';
import AutoHeightImage from 'react-native-auto-height-image';
import AppheaderContainer from '../appheader/appheader.container';
import imagestat from '../../assets/images/stats.png';
import imagecall from '../../assets/images/calls.png';
import imagemessage from '../../assets/images/messages.png';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Dashboard = ({ visitesCount, callCount, messagesCount, demandesCount}) => (
    
    <View style={styles.parent}>

        <ScrollView style={styles.childtwo}>

            <View style={styles.submit}>
                    
                <View style={styles.containervisiteone}>
                    
                    <Icon name="bar-chart" style={styles.iconleft}/>
                    <Text style={styles.topRightText}>{visitesCount}</Text>
                    <Text style={styles.bottomRightText}>Visites</Text>

                </View>
                
                <View style={styles.containervisitetwo}>
                    <Text style={styles.insideStatText}>Voir les détails</Text>
                </View> 

            </View>

            <View style={styles.submit}>
                    
                <View style={styles.containerappelone}>
                    
                    <Icon name="phone" style={styles.iconleft}/>
                    <Text style={styles.topRightText}>{callCount}</Text>
                    <Text style={styles.bottomRightText}>Appels</Text>

                </View>
                
                <View style={styles.containerappeltwo}>
                    <Text style={styles.insideAppelText}>Voir les détails</Text>
                </View> 

            </View>

            <View style={styles.submit}>
                    
                <View style={styles.containermessageone}>
                
                    <Icon name="envelope" style={styles.iconleft}/>
                    <Text style={styles.topRightText}>{messagesCount}</Text>
                    <Text style={styles.bottomRightText}>Messages</Text>

                </View>
                
                <View style={styles.containermessagetwo}>
                    <Text style={styles.insideMessageText}>Voir les détails</Text>
                </View> 

            </View>

            <View style={styles.submit}>
                    
                <View style={styles.containerdemandeone}>
    
                    <Icon name="ticket" style={styles.iconleft}/>
                    <Text style={styles.topRightText}>{demandesCount}</Text>
                    <Text style={styles.bottomRightText}>Demandes</Text>

                </View>
                
                <View style={styles.containerdemandetwo}>
                    <Text style={styles.insideDemandeText}>Voir les détails</Text>
                </View> 

            </View>

        </ScrollView>

    </View>

)

//<AppheaderContainer/>