/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, View } from 'react-native';
import Drawer from "./src/components/appdrawer/config/navigation";

//components after login
import DashboardContainer from './src/components/dashboard/dashboard.container';
import UserListContainer from './src/components/usermanager/userlist/userlist.container';
import { AppHeader } from './src/components/appheader/appheader.component';


export default class App extends Component {
  render() {
    return (
      
          <Drawer/>
      
    );
  }
}

/*
<AppHeader/>
<UserListContainer/>
<DashboardContainer/> 

<View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
      </View>
*/
