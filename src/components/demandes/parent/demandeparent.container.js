import React, { Component } from 'react'
import {View, Text} from 'react-native'
import { createBottomTabNavigator  } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GRIS_TEXT } from '../../../commons/colors';
import AttachmentContainer from '../attachment/attachment.container';
import HistoryContainer from '../history/history.container';
import DemandCreateContainer from '../create/demand.create.container';

export default class DemandeParentContainer extends Component{

    constructor(props) {
        super(props)
        this.state = {
            parentState: 'testing testing',
        }
    }

    render() {
        const {pageType, demand, updateDemands} = this.props.navigation.state.params;

        const TabsDemande = tabsDemande(pageType, demand, updateDemands);
        return (
            
            <View style={{flex: 1}}>
                <TabsDemande />
            </View>
            
        );

    }

}
const tabsDemande = (pageType, demand, updateDemands) => createBottomTabNavigator(
    { 
        DemandeCreateTab: {
            screen: props => <DemandCreateContainer {...props} pageType={pageType} demand={demand} updateDemands={updateDemands} />,
            navigationOptions: {
                title: '',  
            }
        },
        DemandeAttachmentTab: {
            screen: AttachmentContainer,
            navigationOptions: {
                title: '',
            }
        },
        DemandeHistoryTab: {
            screen: HistoryContainer,
            navigationOptions: {
                title: '',
            }
        }
    },
    {
        navigationOptions: ({ navigation }) => ({
           
          tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'DemandeCreateTab') {
                iconName = 'info';
            } else if (routeName === 'DemandeAttachmentTab') {
                iconName = 'paperclip';
            } else if (routeName === 'DemandeHistoryTab') {
                iconName = 'history';
            } 
     
            // You can return any component that you like here! We usually use an
            // icon component from react-native-vector-icons
            return <Icon name={iconName} style={[{fontSize: 30}, {color: focused ? 'orange' : GRIS_TEXT}]} />;
          },
          
        }),
        tabBarOptions: {
            activeTintColor: 'orange',
            inactiveTintColor: GRIS_TEXT,
            showLabel:false,
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

/*const TabsDemande = createBottomTabNavigator ({
    DemandeCreateTab: {
        screen: props => <DemandCreateContainer {...props} />,
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
);*/