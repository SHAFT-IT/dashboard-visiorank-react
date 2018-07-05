import React from 'react'
import {View, Text, StyleSheet } from 'react-native'
import { getData } from '../../commons/preferences';
import LoginContainer from '../login/app.container';
import AutoHeightImage from 'react-native-auto-height-image';
import imageLogo from '../../assets/images/logo_login.png';
import Drawer from "../appdrawer/config/navigation";
import { connect } from 'react-redux';
import { fetchLoginSuccess } from '../../store/actions/login.action';

class Splash extends React.Component{

    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        user: null
      }
      // this code might be called when there is no element avaliable in `document` yet (eg. initial render)
    }

    componentDidMount() {
      getData('user').then((value) => {
        console.log(`Preference in splash: ${value}`);
        this.setState({user: value});   
        this.showAlertWithDelay();
      });
      // this code will be always called when component is mounted in browser DOM ('after render') 
      
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
        }else{
          let jsonObj = null;
          if(this.state.user){
            console.log(`2=======> ${this.state.user}`);
            this.props.dispatch(fetchLoginSuccess(JSON.parse(this.state.user)));
            jsonObj = JSON.parse(this.state.user);
            if(jsonObj.mobile_token)
              return <Drawer />  
          }else{
            return <LoginContainer />  
          }  
        }
        return null;

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

export default connect()(Splash);