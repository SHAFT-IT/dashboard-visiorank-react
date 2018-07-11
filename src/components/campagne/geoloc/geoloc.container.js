import React, { Component } from 'react';
import { StyleSheet,  View,  Text,  Dimensions } from 'react-native';
import { connect } from "react-redux";
import Loader from '../../loader/Loader';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { MAPS_REGION_LATITUDE, MAPS_REGION_LONGITUDE, MAPS_REGION_LATITUDE_DELTA } from '../../../commons/constant';

class AnimatedMarkers extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { error, loading, cities } = this.props;

    if (error){
      return (
        <View style={styles.container}>
            <Text style={styles.errortext}>Erreur lors du chargement du maps! {error.message}</Text>
        </View>
      );
    }

    let items = cities && cities.filter(city => city.latlng !== null)

    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: MAPS_REGION_LATITUDE,
            longitude: MAPS_REGION_LONGITUDE,
            latitudeDelta: MAPS_REGION_LATITUDE_DELTA,
            longitudeDelta: MAPS_REGION_LATITUDE_DELTA * (Dimensions.get('window').width / Dimensions.get('window').height),
          }}
        >
        {
          items && items.map(
            city => (
              <Marker
                title={city.ville}
                coordinate={{latitude: Number(city.latlng.lat),longitude: Number(city.latlng.lng)}}
              />
            )
          )
        }
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

const mapStateToProps = state => ({
  cities: state.campagnes.response.cities,
  loading: state.campagnes.loading,
  error: state.campagnes.error
});

export default connect(mapStateToProps)(AnimatedMarkers);