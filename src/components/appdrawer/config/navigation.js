import React from "react";
import {createStackNavigator, createDrawerNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import DashboardContainer from '../../dashboard/dashboard.container';
import UserListContainer from '../../usermanager/userlist/userlist.container';
import MessagesListContainer from '../../messages/list/message.container';
import DemandesContainer from '../../demandes/list/demandes.container';
import AppelsListContainer from '../../appel/appel.container';
import DrawerContent from "../sidebar/Sidebar";
import {Image} from 'react-native';
import {NAVIGATION_TYPE_MENU, NAVIGATION_TYPE_BACK} from "../../../commons/constant";
import AppheaderContainer from "../../appheader/appheader.container";
import UserCreateContainer from "../../usermanager/usercreate/usercreate.container";
import VisitesContainer from "../../campagne/visites/visites.container";
import GeolocContainer from "../../campagne/geoloc/geoloc.container";
import RepartitionContainer from "../../campagne/repartition/repartition.container";
import MessageDetails from '../../messages/detail/message.item.component'
import UserEditContainer from "../../usermanager/useredit/useredit.container";
import DemandCreateContainer from '../../demandes/create/demand.create.container';


const TabsCampagne = createMaterialTopTabNavigator({
        Visite: VisitesContainer,
        Maps: GeolocContainer,
        Repartition: RepartitionContainer
    },
    {
        tabBarOptions: {
            activeTintColor: '#000',
            inactiveTintColor: 'gray',
            style: {
                backgroundColor: '#fff',
            },
            indicatorStyle: {
                backgroundColor: '#000',
            },
        },
        swipeEnabled: false
    });

const UserStackNavigator = createStackNavigator({
        UserList: {
            screen: UserListContainer
        },
        UserCreate: {
            screen: UserCreateContainer
        },
    },
    {
        navigationOptions: ({navigation}) => ({
            header: null,
        })
    });

const DemandsStackNavigator = createStackNavigator({
        Demands: {
            screen: DemandesContainer
        },
        DemandCreate: {
            screen: DemandCreateContainer
        },
    },
    {
        navigationOptions: ({navigation}) => ({
            header: null,
        })
    });


const DrawerNavigator = createDrawerNavigator({
        Home: {
            screen: DashboardContainer
        },
        User: {
            screen: UserStackNavigator
        },
        Message: {
            screen: MessagesListContainer
        },
        MessageDetails: {
            screen: MessageDetails
        },
        Demandes: {
            screen: DemandsStackNavigator
        },
        Appel: {
            screen: AppelsListContainer
        },
        Campagne: {
            screen: TabsCampagne
        },
        UserEdit: {
            screen: UserEditContainer
        },
    },
    {
        initialRouteName: 'Home',
        drawerWidth: 260,
        drawerPosition: 'right',
        contentOptions: {
            activeBackgroundColor: '#080808',
            inactiveBackgroundColor: '#00000000',
            inactiveTintColor: '#ffffff',
            activeTintColor: '#1eacff',
        },
        contentComponent: props => <DrawerContent {...props}/>,

    }
);

const MenuImage = ({navigation}) => {
    if (!navigation.state.isDrawerOpen) {
        return <Image source={require('../../../assets/images/menu-button.png')}/>
    } else {
        return <Image source={require('../../../assets/images/left-arrow.png')}/>
    }
}

const StackNavigator = createStackNavigator({
        //important: key and screen name (i.e. DrawerNavigator) should be same while using the drawer navigator inside stack navigator.
        DrawerNavigator: {
            screen: DrawerNavigator
        },
        MessagesContainer: {
            screen: MessagesListContainer,
            navigationOptions: ({navigation}) => ({
                header: (
                    <AppheaderContainer navigation={navigation} type={NAVIGATION_TYPE_BACK}/>
                ),
            }),
        }
    },
    {
        navigationOptions: ({navigation}) => ({
            //custom header real
            header: (
                <AppheaderContainer navigation={navigation} type={NAVIGATION_TYPE_MENU}/>
            ),

            //default header without title
            /*title: 'ReactNavigation',  // Title to appear in status bar
            headerLeft:
            <TouchableOpacity  onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }>
                <MenuImage style="styles.bar" navigation={navigation}/>
            </TouchableOpacity>,
            headerStyle: {
                backgroundColor: '#333',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },*/

        })
    });

export default StackNavigator;

/*const styles = StyleSheet.create({
    
    headernav: {
      
      height: 55,
      backgroundColor: 'orange'
    
    },
    
});*/
  