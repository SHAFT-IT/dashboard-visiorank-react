import React, { Component } from 'react';
import { StyleSheet,  View,  Text,  Dimensions } from 'react-native';
import { connect } from "react-redux";
import Loader from '../../loader/Loader';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 48.128590;
const LONGITUDE = 2.522647;
const LATITUDE_DELTA = 12;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
//const LONGITUDE_DELTA = 12;


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

    if (loading){
      return (
        <Loader loading={loading} />
      );
    }

    let items = cities && cities.filter(city => city.latlng !== null)

    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
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