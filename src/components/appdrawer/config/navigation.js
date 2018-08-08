import React from "react";
import { Image } from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
} from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import { GRIS_TEXT } from "../../../commons/colors";
import {
  NAVIGATION_TYPE_MENU,
  NAVIGATION_TYPE_BACK,
} from "../../../commons/constant";
import AppelsListContainer from "../../appel/appel.container";
import AppheaderContainer from "../../appheader/appheader.container";
import GeolocContainer from "../../campagne/geoloc/geoloc.container";
import RepartitionContainer from "../../campagne/repartition/repartition.container";
import VisitesContainer from "../../campagne/visites/visites.container";
import DashboardContainer from "../../dashboard/dashboard.container";
import DemandesContainer from "../../demandes/list/demandes.container";
import DemandeParentContainer from "../../demandes/parent/demandeparent.container";

import MessageDetails from "../../messages/detail/message.item.component";
import MessagesListContainer from "../../messages/list/message.container";
import UserCreateContainer from "../../usermanager/usercreate/usercreate.container";
import UserEditContainer from "../../usermanager/useredit/useredit.container";
import UserListContainer from "../../usermanager/userlist/userlist.container";
import DrawerContent from "../sidebar/Sidebar";

const TabsCampagne = createBottomTabNavigator(
  {
    Visite: {
      screen: VisitesContainer,
      navigationOptions: {
        title: "",
      },
    },
    Maps: {
      screen: GeolocContainer,
      navigationOptions: {
        title: "",
      },
    },
    Repartition: {
      screen: RepartitionContainer,
      navigationOptions: {
        title: "",
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Visite") {
          iconName = `bar-chart${focused ? "" : ""}`;
        } else if (routeName === "Maps") {
          iconName = `map-marker${focused ? "" : ""}`;
        } else if (routeName === "Repartition") {
          iconName = `phone${focused ? "" : ""}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <Icon
            name={iconName}
            style={[
              { fontSize: 30 },
              { color: focused ? "orange" : GRIS_TEXT },
            ]}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: "orange",
      inactiveTintColor: GRIS_TEXT,
      showLabel: false,
      style: {
        backgroundColor: "#fff",
      },
      indicatorStyle: {
        backgroundColor: "#000",
      },
    },
    swipeEnabled: false,
  }
);

const UserStackNavigator = createStackNavigator(
  {
    UserList: {
      screen: UserListContainer,
    },
    UserCreate: {
      screen: UserCreateContainer,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  }
);

const DemandsStackNavigator = createStackNavigator(
  {
    Demands: {
      screen: DemandesContainer,
    },
    DemandCreate: {
      screen: DemandeParentContainer,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  }
);

const MessagesStackNavigator = createStackNavigator(
  {
    Messages: {
      screen: MessagesListContainer,
    },
    MessageDetails: {
      screen: MessageDetails,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  }
);

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: DashboardContainer,
    },
    User: {
      screen: UserStackNavigator,
    },
    Message: {
      screen: MessagesStackNavigator,
    },
    Demandes: {
      screen: DemandsStackNavigator,
    },
    Appel: {
      screen: AppelsListContainer,
    },
    Campagne: {
      screen: TabsCampagne,
    },
    UserEdit: {
      screen: UserEditContainer,
    },
  },
  {
    initialRouteName: "Home",
    drawerWidth: 260,
    drawerPosition: "right",
    contentOptions: {
      activeBackgroundColor: "#080808",
      inactiveBackgroundColor: "#00000000",
      inactiveTintColor: "#ffffff",
      activeTintColor: "#1eacff",
    },
    contentComponent: props => <DrawerContent {...props} />,
  }
);

const MenuImage = ({ navigation }) => {
  if (!navigation.state.isDrawerOpen) {
    return <Image source={require("../../../assets/images/menu-button.png")} />;
  } else {
    return <Image source={require("../../../assets/images/left-arrow.png")} />;
  }
};

const StackNavigator = createStackNavigator(
  {
    //important: key and screen name (i.e. DrawerNavigator) should be same while using the drawer navigator inside stack navigator.
    DrawerNavigator: {
      screen: DrawerNavigator,
    },
    MessagesContainer: {
      screen: MessagesListContainer,
      navigationOptions: ({ navigation }) => ({
        header: (
          <AppheaderContainer
            navigation={navigation}
            type={NAVIGATION_TYPE_BACK}
          />
        ),
      }),
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      //custom header real
      header: (
        <AppheaderContainer
          navigation={navigation}
          type={NAVIGATION_TYPE_MENU}
        />
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
    }),
  }
);

export default StackNavigator;

/*const styles = StyleSheet.create({
    
    headernav: {
      
      height: 55,
      backgroundColor: 'orange'
    
    },
    
});*/
