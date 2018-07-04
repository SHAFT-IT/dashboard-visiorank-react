import React from 'react'
import {View, Text, StyleSheet } from 'react-native'
import { getData } from '../../commons/preferences';
import LoginContainer from '../login/app.container';
import AutoHeightImage from 'react-native-auto-height-image';
import imageLogo from '../../assets/images/logo_login.png';

export default class Splash extends React.Component{

    constructor(props) {
      super(props);
      this.state = {
        loading: true
      }
      // this code might be called when there is no element avaliable in `document` yet (eg. initial render)
    }

    componentDidMount() {
      // this code will be always called when component is mounted in browser DOM ('after render')
      getData('user').then((value) => {
          console.log(`Preference : ${value}`)
          this.showAlertWithDelay();
        }
      ).catch(error=>{}
        //this.showAlertWithDelay();
      );

    }

    showAlertWithDelay = () => {
      setTimeout(() =>this.setState({loading: false}), 5000);
    }

    render() {
        const { loading } = this.state;
        if (loading) {
            return (
            <View style={styles.containersplash}>
                <AutoHeightImage
                  source={imageLogo}
                  width={200}
                />
            </View>);
        }
        return <LoginContainer />  

        /*return (
          <View>
              <Text >Error calling ws! {loading ? 'loading' : 'loaded'}</Text>
          </View>
      );*/
    }

}

const styles = StyleSheet.create({
    
  containersplash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1'
  },


});

