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
import styles from './usercreate.style';

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
            if(response.code == 200){
                this.props.navigation.goBack();
                this.props.navigation.state.params.updateData();
            }else{
                AlertError('Erreur lors du traitement...') 
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
        //this.props.navigation.navigate('User');  
        this.props.navigation.goBack();
    }
  
    onFocus() {
        console.log('FOCUS GET ON AUTOCOMPLETE');
        setTimeout(() => this.scroller.scrollTo({x: 0, y: 260}), 1000);
         
    }

    onCreate = () => {

      console.log('ONCREATE USER =>', this.state.userid , ' | ',this.state.nom, ' | ', this.state.prenom , ' | ', this.state.societe, ' | ', this.state.telephone , ' | ', this.state.query , 'with id ', this.state.analytics , ' | ', this.state.email , ' | ', this.state.mdpimap, ' | ', this.state.mdp);
      if(this.state.nom.length > 0 && this.state.prenom.length > 0 && this.state.societe.length > 0 && this.state.telephone.length > 0 && this.state.query.length > 0 && this.state.email.length > 0 && this.state.mdpimap.length > 0){

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(this.state.email) === false)
            AlertError("Email invalide !");    
        else
            this.props.dispatch(createUpdateUser(this.state.userid, this.state.nom, this.state.prenom, this.state.societe, this.state.telephone, this.state.analytics, this.state.email, this.state.mdpimap, this.state.mdp));
 
      }else{

        AlertError("Veuillez remplir les champs obligatoires!");

      }

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
 
                {/*
                    errorcreateupdate && (
                        <AlertError textErrorValue='Erreur lors de la creation !' />
                    )*/
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

                    <TouchableOpacity
                        style={styles.containericonright}
                        underlayColor='transparent'
                        onPress={this.onCreate}>
                        <Icon name="check-circle" style={styles.icontop}/>
                    </TouchableOpacity>

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

                    <View style={{height: 40}}

                    />
                    
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

/*
<TouchableOpacity
    style={styles.buttonSubmit}
    onPress={this.onCreate}>
    {this.state.pagetype === NAVIGATION_TYPE_USER_CREATE ? 
        <Text style={styles.buttonText}>Ajouter</Text> :
        <Text style={styles.buttonText}>Modifier</Text>
    }
        
</TouchableOpacity>
*/

export default connect(mapStateToProps)(UserCreateContainer);

