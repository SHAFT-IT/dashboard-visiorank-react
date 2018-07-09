import React, { Component } from 'react'
import {View, Text} from 'react-native'

export default class RepartitionContainer extends Component{

    componentDidMount() {
        console.log('RepartitionContainer');
    }

    render() {
        return (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
            <Text style={{fontSize: 20, textAlign: 'center', margin: 10}}>
              Repartition
            </Text>
          </View>
        );
    }

}