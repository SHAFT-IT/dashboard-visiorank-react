/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import store from './src/store'
import { Provider } from 'react-redux'

//components after login
import Splash from './src/components/splash/splash';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Splash />
      </Provider>
    );
  }
}
