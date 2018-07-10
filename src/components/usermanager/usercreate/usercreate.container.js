import React from 'react'
import {View, TextInput, ScrollView, Text, Alert, StyleSheet, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

class UserCreateContainer extends React.Component{

    goBackToUser = () => {
      console.log('PROPS NAVIGATION UserCreateContainer=>', this.props.navigation);
      this.props.navigation.goBack();
    }

    constructor(props){
        super(props)
    
        this.state = {
          nom: '',
          prenom: '',
          societe: '',
        }
    }
    
    _createaction = () => {
        Alert.alert(this.state.societe)
    }
  
    render() {
      return (
        <View>
          <ScrollView style={styles.scrollcontent}>
            <View>
                <Text style={styles.bigtitle}>Ajouter un utilisateur</Text>
                <TextInput style={styles.edittext}
                  placeholder="Nom"
                  underlineColorAndroid='transparent'
                  returnKeyLabel = {"next"}
                  onChangeText={(textnom) => this.setState({nom:textnom})}
                />
                <TextInput style={styles.edittext}
                  placeholder="Prénom"
                  underlineColorAndroid='transparent'
                  returnKeyLabel = {"next"}
                  onChangeText={(textprenom) => this.setState({prenom:textprenom})}
                />
                <TextInput style={styles.edittext}
                  placeholder="Société"
                  underlineColorAndroid='transparent'
                  returnKeyLabel = {"next"}
                  onChangeText={(textsociete) => this.setState({societe:textsociete})}
                />

                <TouchableHighlight
                    style={styles.buttonSubmit}
                    onPress={this.onPress}>

                    <Text style={styles.buttonText}>Ajouter</Text>

                </TouchableHighlight>
                
            </View>
          </ScrollView>

          <TouchableHighlight
              style={styles.containericontop}
              underlayColor='transparent'
              onPress={() => this.goBackToUser()}>
              <Icon name="chevron-circle-left" style={styles.icontop}/>
          </TouchableHighlight>
          
        </View>
        
      );
  }


}

/*
onPress={this.props.navigation.goBack()}*/

UserCreateContainer.propTypes = {
  navigation: PropTypes.object
};

export default connect()(UserCreateContainer);

const styles = StyleSheet.create({
  edittext: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
    height: 45,
    borderRadius: 6,
    borderWidth: 1,
    paddingLeft: 15,
    borderColor: '#939393',
  },
  
  scrollcontent: {
    marginTop: 17,
  },
  
  icontop: {
    fontSize: 45,
    color: 'grey',
    
  },

  containericontop: {
    position: 'absolute',
    top: 10,
    left: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 45,
    height: 45
  },
  
  buttonSubmit: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 50,
    borderRadius: 6,
    paddingLeft: 15,
    backgroundColor: 'green',
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  bigtitle: {
    textAlign: 'center',
    color: '#939393',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20
  }

});
