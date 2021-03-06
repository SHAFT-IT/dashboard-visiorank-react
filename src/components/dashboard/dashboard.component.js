import React from 'react';
import { ScrollView, Text, TouchableHighlight, View } from 'react-native';
import styles from './dashboard.style';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  CLICK_DASHBOARD_APPEL,
  CLICK_DASHBOARD_DEMANDE,
  CLICK_DASHBOARD_MESSAGE,
  CLICK_DASHBOARD_VISITE
} from '../../commons/constant';

export const Dashboard = ({ visitesCount, callCount, messagesCount, demandesCount, onClickItem }) => (
  <View style={styles.parent}>
    <ScrollView style={styles.childtwo}>
      <TouchableHighlight underlayColor='transparent' onPress={() => onClickItem(CLICK_DASHBOARD_VISITE)}>
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
      </TouchableHighlight>
      <TouchableHighlight underlayColor='transparent' onPress={() => onClickItem(CLICK_DASHBOARD_APPEL)}>
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
      </TouchableHighlight>
      <TouchableHighlight underlayColor='transparent' onPress={() => onClickItem(CLICK_DASHBOARD_MESSAGE)}>
        <View style={styles.submit}>
          <View style={styles.containermessageone}>
            <Icon name="envelope" style={styles.iconleft}/>
            <Text style={styles.topRightText}>{messagesCount}</Text>
            <Text style={styles.bottomRightText}>Message(s) non lu(s)</Text>
          </View>
          <View style={styles.containermessagetwo}>
            <Text style={styles.insideMessageText}>Voir les détails</Text>
          </View>
        </View>
      </TouchableHighlight>

      <TouchableHighlight underlayColor='transparent' onPress={() => onClickItem(CLICK_DASHBOARD_DEMANDE)}>
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
      </TouchableHighlight>
    </ScrollView>
  </View>
);
