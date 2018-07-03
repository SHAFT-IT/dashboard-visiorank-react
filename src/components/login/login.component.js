import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import { LockIcon, LogoIcon, PersonIcon } from '../../commons/images';
import { VisioButton } from '../button/visio.button.component';

const { width, height } = Dimensions.get("window");
export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: ''
    };
  }

  onPress = () => {
    const { login, loading, user } = this.props;
    //alert(`${this.state.email} ${this.state.password}`);

    console.log(this.state.password);
    //this.state.email, this.state.password
    login("admin@visiorank.fr","aUxSxWny");//"admin@visiorank.fr","aUxSxWny";

  }

  onChangeText = (name, value) => {
    console.log(name, value)
    this.setState({[name]: value})
  }

  render ()  {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View style={styles.container}>
              <View style={styles.markWrap}>
              <Image source={LogoIcon} style={styles.mark} resizeMode="contain" />
          </View>
          <View style={styles.wrapper}>
              <View style={styles.inputWrap}>
                  <View style={styles.iconWrap}>
                      <Image source={PersonIcon} style={styles.icon} resizeMode="contain" />
                  </View>
                  <TextInput 
                      autoCapitalize='none'
                      keyboardType='email-address'
                      placeholder="Email" 
                      placeholderTextColor="#FFF"
                      underlineColorAndroid="transparent"
                      style={styles.input} 
                      onChangeText={(email) => this.onChangeText('email', email)}/>
          </View>
          
          <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                  <Image source={LockIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput 
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#FFF"
                  placeholder="Mot de passe" 
                  style={styles.input} 
                  secureTextEntry 
                  onChangeText={(password) =>  this.onChangeText('password', password)}
            />
          </View>
            <VisioButton onPress={this.onPress}/>
          </View>  
          </View>
        </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'black'
    },
    markWrap: {
      flex: 1,
      paddingVertical: 50,
    },
    mark: {
      width: null,
      height: null,
      flex: 1,
    },
    background: {
      width,
      height,
    },
    wrapper: {
      paddingVertical: 0,
    },
    inputWrap: {
      flexDirection: "row",
      marginVertical: 10,
      height: 40,
      borderBottomWidth: 1,
      borderBottomColor: "#CCC"
    },
    iconWrap: {
      paddingHorizontal: 7,
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      height: 20,
      width: 20,
    },
    input: {
      flex: 1,
      paddingHorizontal: 10,
      color : "white"
    },
   
    signupWrap: {
      backgroundColor: "transparent",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    accountText: {
      color: "#D8D8D8"
    },
    signupLinkText: {
      marginVertical: 30,
      color: "#f97f05",
    }, 
  });





