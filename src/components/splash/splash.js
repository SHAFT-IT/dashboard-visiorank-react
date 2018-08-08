import React from 'react'
import {View, Text, StyleSheet } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image';
import imageLogo from '../../assets/images/logo_login.png';
import HomeSwitchNavigator from "../home/home";
import { connect } from 'react-redux';
import { fetchLoginSuccess } from '../../store/actions/login.action';

class Splash extends React.Component{

    constructor(props) {
      super(props);
      this.state = {
        loading: true,
      }
      
    }

    componentDidMount() {
      
        this.showAlertWithDelay();
      
    }

    showAlertWithDelay = () => {
      setTimeout(() => this.setState({loading: false}) , 5000);
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
            </View>
        );
      }else{
        return <HomeSwitchNavigator /> 
      }
        
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

export default connect()(Splash);