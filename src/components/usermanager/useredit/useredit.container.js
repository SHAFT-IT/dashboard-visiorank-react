import React, { Component } from 'react'
import {View, TextInput, ScrollView, Text, Alert, StyleSheet, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Loader from '../../loader/Loader';
import { fetchSites } from '../../../store/actions/sites.action';
import { NavigationActions } from 'react-navigation'
 
class UserEditContainer extends Component{

    componentDidMount() {
        this.props.dispatch(fetchSites());
    }

    goBackToUser = () => {
        console.log('PROPS NAVIGATION UserCreateContainer=>', this.props.navigation);
        //this.props.navigation.goBack(null);  
        /*const backAction = NavigationActions.back({
            routeName: 'User'
          });
        this.props.navigation.dispatch(backAction);*/
        this.props.navigation.navigate('User');  
    }

    constructor(props){
        super(props)
    
        this.state = {
            nom: '',
            prenom: '',
            societe: '',
            telephone: '',
            site: '',
            email: '',
            mdpimap: '',
            mdp: ''
        }
    }
    
    render() {


        const { error, loading, sites } = this.props;
        
        if (error) {
            console.log("This is ERROR SITES");
            return (
                <View style={styles.container}>
                    <Text style={styles.errortext}>Erreur lors de la récuperation des sites !</Text>
                </View>
            );
        }

        const { user } = this.props.navigation.state.params;

        return (
          
            <View>

                {loading && (
                    <Loader loading={loading} />)
                }

                <ScrollView style={styles.scrollcontent}>
                    <View>
                        <Text style={styles.bigtitle}>Modifier un utilisateur</Text>
                        <TextInput style={styles.edittext}
                            placeholder="Nom"
                            underlineColorAndroid='transparent'
                            returnKeyLabel = {"next"}
                            value={user.nom}
                            onChangeText={(textnom) => this.setState({nom:textnom})}
                        />
                        <TextInput style={styles.edittext}
                            placeholder="Prénom"
                            underlineColorAndroid='transparent'
                            returnKeyLabel = {"next"}
                            value={user.prenom}
                            onChangeText={(textprenom) => this.setState({prenom:textprenom})}
                        />
                        <TextInput style={styles.edittext}
                            placeholder="Société"
                            underlineColorAndroid='transparent'
                            returnKeyLabel = {"next"}
                            value={user.societe}
                            onChangeText={(textsociete) => this.setState({societe:textsociete})}
                        />
                        <TextInput style={styles.edittext}
                            placeholder="Numéro de téléphone VISIORANK"
                            underlineColorAndroid='transparent'
                            returnKeyLabel = {"next"}
                            value={user.telephone}
                            onChangeText={(textphone) => this.setState({telephone:textphone})}
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

UserEditContainer.propTypes = {
    navigation: PropTypes.object
};

const mapStateToProps = state => ({
    sites: state.sites.items,
    loading: state.sites.loading,
    error: state.sites.error
});

export default connect(mapStateToProps)(UserEditContainer);

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
  