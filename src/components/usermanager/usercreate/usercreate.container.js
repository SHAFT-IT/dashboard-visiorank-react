import React from 'react'
import {
    View,
    TextInput,
    ScrollView,
    Text,
    Keyboard,
    TouchableOpacity,
    StyleSheet,
    TouchableHighlight
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Loader from '../../loader/Loader';
import {fetchSites} from '../../../store/actions/sites.action';
import Autocomplete from 'react-native-autocomplete-input';
import { NAVIGATION_TYPE_USER_CREATE, NAVIGATION_TYPE_USER_UPDATE } from '../../../commons/constant';
import { createUpdateUser } from '../../../store/actions/usercreate.action';
import LoaderCreate from '../../loader/LoaderCreate';
import { AlertError } from '../../alert/AlertError';

class UserCreateContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            userid: 0,
            nom: '',
            prenom: '',
            societe: '',
            telephone: '',
            analytics: '',
            email: '',
            mdpimap: '',
            mdp: '',
            pagetype: null
        };
    }

    componentWillReceiveProps ({ response, sites }) {
        
        if (response && response !== this.props.response) {  
            console.log("CREATE 2"); 
            if(response.code == 200){
                console.log("CREATE 3");
                this.props.dispatch(fetchSites());
            }
        }

        if(this.state.pagetype === NAVIGATION_TYPE_USER_UPDATE){
            console.log("componentWillReceiveProps NAVIGATION_TYPE_USER_UPDATE"); 
            if (sites && sites !== this.props.sites && sites.length > 0) {
                console.log("AFTER GET SITES");
                sites.map(site => {

                    if(this.state.analytics === site.id)
                        this.setState({query: site.websiteUrl});

                });
            }
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchSites());

        //test if from update or from create
        const { user, pagetype } = this.props.navigation.state.params;
        
        if(pagetype === NAVIGATION_TYPE_USER_CREATE){
            //PAGE IS CREATE USER
            this.setState({pagetype: pagetype, userid: 0, nom: '', prenom: '', societe: '', telephone: '', analytics: '', email: '', mdpimap: '', mdp: ''});
        }else if(pagetype === NAVIGATION_TYPE_USER_UPDATE){
            //PAGE IS UPDATE USER
            this.setState({pagetype: pagetype, userid: user.id, nom: user.nom, prenom: user.prenom, societe: user.societe, telephone: user.telephone, analytics: user.analytics, email: user.email, mdpimap: user.imap, mdp: ''});
        }

    }

    goBackToUser = () => {
        console.log('PROPS NAVIGATION UserCreateContainer=>', this.props.navigation);
        this.props.navigation.navigate('User');  
    }
  
    onFocus() {
        console.log('FOCUS GET ON AUTOCOMPLETE');
        setTimeout(() => this.scroller.scrollTo({x: 0, y: 260}), 1000);
         
    }

    onCreate = () => {

      console.log('ONCREATE USER =>', this.state.userid , ' | ',this.state.nom, ' | ', this.state.prenom , ' | ', this.state.societe, ' | ', this.state.telephone , ' | ', this.state.query , 'with id ', this.state.analytics , ' | ', this.state.email , ' | ', this.state.mdpimap, ' | ', this.state.mdp);
      this.props.dispatch(createUpdateUser(this.state.userid, this.state.nom, this.state.prenom, this.state.societe, this.state.telephone, this.state.analytics, this.state.email, this.state.mdpimap, this.state.mdp));

    }

    findSite(query) {
        if (query === '') {
            return [];
        }
        const {sites} = this.props;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return sites.filter(site => site.websiteUrl.search(regex) >= 0);
    }

    render() {

        //for user create
        const {error, loading, loadingcreateupdate, errorcreateupdate} = this.props;
        const {query} = this.state;
        const filteredSites = this.findSite(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        if (error) {
            return (
                <View style={styles.container}>
                    <Text style={styles.errortext}>Erreur lors de la récuperation des sites !</Text>
                </View>
            );
        }

        //for user update
        
        return (
            <View style={styles.allcontent}>
 
                {
                    errorcreateupdate && (
                        <AlertError textErrorValue='Erreur lors de la creation !' />
                    )
                }
 
                {
                    loadingcreateupdate && (
                        
                        this.state.pagetype === NAVIGATION_TYPE_USER_CREATE ?
                            <LoaderCreate loading={loadingcreateupdate} textvalue='Creation utilisateur...'/> :
                            <LoaderCreate loading={loadingcreateupdate} textvalue='Edition utilisateur...'/>
                        
                    )
                }

                {
                    loading && (<Loader loading={loading}/>)
                        
                }

                <View style={{height: 60}}>

                    {this.state.pagetype === NAVIGATION_TYPE_USER_CREATE ? 
                      <Text style={styles.bigtitle}>Ajout utilisateur</Text> :
                      <Text style={styles.bigtitle}>Modification utilisateur</Text>
                    }
          
                    <TouchableHighlight
                      style={styles.containericontop}
                      underlayColor='transparent'
                      onPress={() => this.goBackToUser()}>
                        <Icon name="chevron-circle-left" style={styles.icontop}/>
                    </TouchableHighlight>

                </View>

                <ScrollView keyboardShouldPersistTaps={'handled'} ref={(scroller) => {this.scroller = scroller}}>    
                    
                    <TextInput style={styles.edittext}
                            placeholder="Nom"
                            underlineColorAndroid='transparent'
                            returnKeyLabel = {"next"}
                            value={this.state.nom}
                            onChangeText={(textnom) => this.setState({nom:textnom})}
                    />
                    <TextInput style={styles.edittext}
                            placeholder="Prénom"
                            underlineColorAndroid='transparent'
                            returnKeyLabel = {"next"}
                            value={this.state.prenom}
                            onChangeText={(textprenom) => this.setState({prenom:textprenom})}
                    />
                    <TextInput style={styles.edittext}
                            placeholder="Société"
                            underlineColorAndroid='transparent'
                            returnKeyLabel = {"next"}
                            value={this.state.societe}
                            onChangeText={(textsociete) => this.setState({societe:textsociete})}
                    />
                    <TextInput style={styles.edittext}
                            placeholder="Numéro de téléphone VISIORANK"
                            underlineColorAndroid='transparent'
                            returnKeyLabel = {"next"}
                            value={this.state.telephone}
                            onChangeText={(textphone) => this.setState({telephone:textphone})}
                    />
 
                    <Autocomplete
                        onFocus={ () => this.onFocus() }
                        autoCapitalize="none"
                        autoCorrect={false}
                        containerStyle={styles.autocompleteContainer}
                        data={filteredSites.length === 1 && comp(query, filteredSites[0].websiteUrl) ? [] : filteredSites}
                        defaultValue={query}
                        onChangeText={text => this.setState({query: text})}
                        placeholder="Site Google Analytics"
                        renderItem={({websiteUrl, id}) => (
                            <TouchableOpacity onPress={() => {
                                this.setState({query: websiteUrl, analytics:id })
                                Keyboard.dismiss()
                            }}>
                                <Text style={styles.itemText}>
                                    {websiteUrl}
                                </Text>
                            </TouchableOpacity>
                        )}
                        renderTextInput={(props) => (
                            <TextInput {...props} style={styles.edittextautocomplete}
                                       underlineColorAndroid='transparent'
                            />)
                        }
                    />
                    <TextInput style={styles.edittext}
                               placeholder="Email"
                               underlineColorAndroid='transparent'
                               returnKeyLabel = {"next"}
                               value={this.state.email}
                               onChangeText={(textemail) => this.setState({email:textemail})}
                    />
                    <TextInput style={styles.edittext}
                               placeholder="Mot de passe IMAP"
                               underlineColorAndroid='transparent'
                               returnKeyLabel = {"next"}
                               value={this.state.mdpimap}
                               onChangeText={(textimap) => this.setState({mdpimap:textimap})}
                    />
                    <TextInput style={styles.edittext}
                               placeholder="Mot de passe"
                               underlineColorAndroid='transparent'
                               returnKeyLabel = {"next"}
                               secureTextEntry
                               value={this.state.mdp}
                               onChangeText={(textpassword) => this.setState({mdp:textpassword})}
                    />
                    <TouchableOpacity
                        style={styles.buttonSubmit}
                        onPress={this.onCreate}>
                        {this.state.pagetype === NAVIGATION_TYPE_USER_CREATE ? 
                          <Text style={styles.buttonText}>Ajouter</Text> :
                          <Text style={styles.buttonText}>Modifier</Text>
                        }
                            
                    </TouchableOpacity>
                </ScrollView>

            </View>
        );
    }
}

UserCreateContainer.propTypes = {
    navigation: PropTypes.object
};

const mapStateToProps = state => ({
    sites: state.sites.items,
    loading: state.sites.loading,
    error: state.sites.error,
    errorcreateupdate:  state.usercreateupdate.error,
    loadingcreateupdate: state.usercreateupdate.loadingcreateupdate,
    response: state.usercreateupdate.response
});

export default connect(mapStateToProps)(UserCreateContainer);

const styles = StyleSheet.create({

    allcontent: {
        flex: 1,
        flexDirection: 'column'
    },
    container: {
        backgroundColor: '#F5FCFF',
        paddingTop: 25
    },
    autocompleteContainer: {
        left: 0,
        right: 0,
        top: 0,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        borderRadius: 6,
        borderWidth: 0.5,
        position:'relative',
        borderColor: '#939393',
    },
    edittextautocomplete: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
        height: 45,
    },
    itemText: {
        fontSize: 15,
        margin: 2
    },
    descriptionContainer: {
        backgroundColor: '#F5FCFF',
        marginTop: 25
    },
    infoText: {
        textAlign: 'center'
    },
    titleText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center'
    },
    directorText: {
        color: 'grey',
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'center'
    },
    openingText: {
        textAlign: 'center'
    },
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
        left: 25,
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,  
    },
    buttonSubmit: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 20,
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
        marginBottom: 20,
        marginTop: 20
    }
    
});