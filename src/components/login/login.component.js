import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableHighlight,
  Text,
} from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import imageLogo from "../../assets/images/logo_login.png";
import { AlertError } from "../alert/AlertError";

import Loader from "../loader/Loader";

const { width, height } = Dimensions.get("window");
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "admin@visiorank.fr",
      password: "aUxSxWny",
      formvalidation: false,
    };
  }

  onPress = () => {
    const { login } = this.props;
    console.log(this.state.password);
    if (this.state.email.length > 0 && this.state.password.length > 0) {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(this.state.email) === false) AlertError("Email invalide !");
      else login(this.state.email, this.state.password);
    } else {
      AlertError("Veuillez remplir les champs !");
    }
  };

  onChangeText = (name, value) => {
    console.log(name, value);
    this.setState({ [name]: value });
  };

  componentWillReceiveProps({ response }) {
    if (response && response !== this.props.response) {
      if (response.code == 1001) {
        AlertError(response.message);
      }
    }
  }

  render() {
    const { loading, response } = this.props;

    return (
      <View style={styles.container}>
        {loading && <Loader loading={true} />}

        <ScrollView style={styles.wrapper}>
          <View style={styles.iconTop}>
            <AutoHeightImage source={imageLogo} width={200} />
          </View>

          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Email"
            placeholderTextColor="#9d9d9d"
            underlineColorAndroid="transparent"
            style={styles.input}
            returnKeyLabel={"next"}
            onSubmitEditing={() => {
              this.passwordTextInput.focus();
            }}
            blurOnSubmit={false}
            value={this.state.email}
            onChangeText={email => this.onChangeText("email", email)}
          />

          <TextInput
            ref={input => {
              this.passwordTextInput = input;
            }}
            underlineColorAndroid="transparent"
            placeholderTextColor="#9d9d9d"
            placeholder="Mot de passe"
            style={styles.input}
            secureTextEntry
            value={this.state.password}
            onChangeText={password => this.onChangeText("password", password)}
          />

          <TouchableHighlight
            style={styles.buttonSubmit}
            onPress={this.onPress}
          >
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  allcontent: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  markWrap: {
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
    marginTop: 60,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
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
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
    height: 45,
    borderRadius: 6,
    borderWidth: 1,
    paddingLeft: 15,
    borderColor: "#939393",
    backgroundColor: "white",
    color: "black",
  },

  signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accountText: {
    color: "#D8D8D8",
  },
  signupLinkText: {
    marginVertical: 30,
    color: "#f97f05",
  },
  iconTop: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  buttonSubmit: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 50,
    borderRadius: 6,
    paddingLeft: 15,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
