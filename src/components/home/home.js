import React from "react";
import { createSwitchNavigator } from 'react-navigation';
import Drawer from "../appdrawer/config/navigation";
import LoginContainer from '../login/login.container';
import AuthLoadingScreen from "../authloading/AuthLoadingScreen";

const HomeSwitchNavigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        Authentification: LoginContainer,
        Home: Drawer,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);

export default HomeSwitchNavigator;