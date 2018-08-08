/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import OfflineNotice from "./src/components/internet/offline.notice";
import Splash from "./src/components/splash/splash";
import store from "./src/store";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prefuser: "",
    };
  }

  componentDidMount() {
    console.disableYellowBox = true;
  }

  render() {
    return (
      <Provider store={store()}>
        <View style={styles.container}>
          <OfflineNotice />
          <Splash />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
