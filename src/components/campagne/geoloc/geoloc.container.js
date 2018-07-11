import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'

export default class GeolocContainer extends Component{

    componentDidMount() {
        console.log('GeolocContainer');
    }

    render() {
      const { region } = this.props;
      console.log(region);
        return (
          <View style ={styles.container}>
          Geolocalisation
        </View>
        );
    }
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});