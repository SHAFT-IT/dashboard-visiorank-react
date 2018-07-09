import React from 'react'
import {View, TextInput, ScrollView, Button, Alert, StyleSheet} from 'react-native'

export default class UserCreateContainer extends React.Component{

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
        <ScrollView style={styles.scrollcontent}>
          <View>
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
              <Button style={styles.button}
                title="Create User"
                onPress={() => this._createaction()}
              />

          </View>
        </ScrollView>
      );
  }


}



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
    borderColor: '#D2CAEC',
  },
  
  scrollcontent: {
    marginTop: 30,
  },
  
  button: {
    marginLeft: 30,
    height: 45,
  
  },
  
  
});
