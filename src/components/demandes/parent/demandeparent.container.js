import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { createBottomTabNavigator  } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GRIS_TEXT } from '../../../commons/colors';
import AttachmentContainer from '../attachment/attachment.container';
import HistoryContainer from '../history/history.container';
import DemandCreateContainer from '../create/demand.create.container';
import { NAVIGATION_TYPE_DEMAND_CREATE } from '../../../commons/constant';

export default class DemandeParentContainer extends Component{

    constructor(props) {
        super(props)
        this.state = {
            parentState: 'testing testing',
        }
    }

    onBackPressed = () => {
        this.props.navigation.goBack();
    }

    render() {
        const {pageType, demand, updateDemands} = this.props.navigation.state.params;

        const TabsDemande = tabsDemande(pageType, demand, updateDemands);
        return (
            
            <View style={{flex: 1}}>

                <View style={{height: 40, marginTop: 0}}> 
                    
                    {pageType === NAVIGATION_TYPE_DEMAND_CREATE ?
                        <Text style={styles.bigtitle}>Ajouter une demande</Text> :
                        <Text style={styles.bigtitle}>Modifier la demande</Text>
                    }

                    <TouchableOpacity
                        style={styles.containericontop}
                        underlayColor='transparent'
                        onPress={this.onBackPressed}>
                        <Icon name="chevron-circle-left" style={styles.icontop}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.containericonright}
                        underlayColor='transparent'
                        onPress={this.onBackPressed}>
                        <Icon name="check-circle" style={styles.iconright}/>
                    </TouchableOpacity>

                </View>

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
            screen: props => <AttachmentContainer {...props} pageType={pageType} />,
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

const styles = StyleSheet.create({
    containericontop: {
        position: 'absolute',
        top: 5,
        left: 25,
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40, 
    },
    containericonright: {
        position: 'absolute',
        top: 5,
        right: 25,
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
    },
    icontop: {
        fontSize: 35,
        color: 'grey',
    },
    iconright: {
        fontSize: 35,
        color: 'grey',
    },
    bigtitle: { 
        textAlign: 'center',
        color: '#939393',
        fontSize: 14,  
        fontWeight: 'bold',
        marginTop: 15
    }
});