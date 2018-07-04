import React from "react";
import {createStackNavigator, createDrawerNavigator} from 'react-navigation';
import DashboardContainer from '../../dashboard/dashboard.container';
import UserListContainer from '../../usermanager/userlist/userlist.container';
import DrawerContent from "../sidebar/Sidebar";
import { Image} from 'react-native';
import { AppHeader } from '../../appheader/appheader.component';

const DrawerNavigator = createDrawerNavigator({
        Home:{
            screen: DashboardContainer
        },
        User:{
            screen: UserListContainer
        }
    },
    {
        initialRouteName: 'Home',
        contentComponent: DrawerContent,
        drawerWidth: 300,
        drawerPosition: 'right',
    }
);

const MenuImage = ({navigation}) => {
    if(!navigation.state.isDrawerOpen){
        return <Image source={require('../../../assets/images/menu-button.png')}/>
    }else{
        return <Image source={require('../../../assets/images/left-arrow.png')}/>
    }
}

const StackNavigator = createStackNavigator({
    
    //important: key and screen name (i.e. DrawerNavigator) should be same while using the drawer navigator inside stack navigator.
    
    DrawerNavigator:{
        screen: DrawerNavigator
    },
},{
    navigationOptions: ({ navigation }) => ({

        //custo header try
        header: ( /* Your custom header */
            <AppHeader navigation={navigation}/>
        ),

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
  