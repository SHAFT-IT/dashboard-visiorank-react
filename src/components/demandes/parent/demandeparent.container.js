import React, { Component } from 'react'
import {View, Text} from 'react-native'
import { createBottomTabNavigator  } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GRIS_TEXT } from '../../../commons/colors';
import AttachmentContainer from '../attachment/attachment.container';
import HistoryContainer from '../history/history.container';
import DemandCreateContainer from '../create/demand.create.container';

export default class DemandeParentContainer extends Component{

    render() {

        return (
            
            <View style={{flex: 1}}>

                <TabsDemande />
            </View>
            
        );

    }

}

/*
<View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            
                <TabsDemande/>
            
            </View>
*/

const TabsDemande = createBottomTabNavigator ({
    DemandeCreateTab: {
        screen: DemandCreateContainer,
        navigationOptions: {
            title: 'Ajout',
        }
    },
    DemandeAttachmentTab: {
        screen: AttachmentContainer,
        navigationOptions: {
            title: 'Pièce jointe',
        }
    },
    DemandeHistoryTab: {
        screen: HistoryContainer,
        navigationOptions: {
            title: 'Historique',
        }
    }
},
{
    navigationOptions: ({ navigation }) => ({
       
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'DemandeCreateTab') {
            iconName = 'plus';
        } else if (routeName === 'DemandeAttachmentTab') {
            iconName = 'paperclip';
        } else if (routeName === 'DemandeHistoryTab') {
            iconName = 'history';
        } 
 
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} style={[{fontSize: 17}, {color: focused ? 'orange' : GRIS_TEXT}]} />;
      },
      
    }),
    tabBarOptions: {
        activeTintColor: 'orange',
        inactiveTintColor: GRIS_TEXT,
        style:{
            height:40,
            backgroundColor: '#fff',
            shadowRadius: 6,
            shadowOpacity: 1,
            shadowColor: 'rgba(0,0,0,0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            }
        },
        indicatorStyle: {
            backgroundColor: '#000',
        },
    },
    swipeEnabled: false,
}
);