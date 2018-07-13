import React from 'react'
import {
    View,
    TextInput,
    ScrollView,
    Text,
    Keyboard,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Loader from '../../loader/Loader';
import {fetchSites} from '../../../store/actions/sites.action';
import Autocomplete from 'react-native-autocomplete-input';

class UserCreateContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: ''
        };
    }

    componentDidMount() {
        this.props.dispatch(fetchSites());
    }

    onPress = () => {

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
        const {error, loading} = this.props;
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
        return (
            <View>
                {
                    loading ? <Loader loading={loading}/> :
                        <View/>
                }
                <ScrollView>
                    <Autocomplete
                        autoCapitalize="none"
                        autoCorrect={false}
                        containerStyle={styles.autocompleteContainer}
                        data={filteredSites.length === 1 && comp(query, filteredSites[0].websiteUrl) ? [] : filteredSites}
                        defaultValue={query}
                        onChangeText={text => this.setState({query: text})}
                        placeholder="Site Google Analytics"
                        renderItem={({websiteUrl}) => (
                            <TouchableOpacity onPress={() => {
                                this.setState({query: websiteUrl})
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
                               placeholder="Nom"
                               underlineColorAndroid='transparent'
                               returnKeyLabel = {"next"}
                               onChangeText={(name) => {}}
                    />
                    <TextInput style={styles.edittext}
                               placeholder="Prénom"
                               underlineColorAndroid='transparent'
                               returnKeyLabel = {"next"}
                               onChangeText={(firstname) => {}}
                    />
                    <TextInput style={styles.edittext}
                               placeholder="Société"
                               underlineColorAndroid='transparent'
                               returnKeyLabel = {"next"}
                               onChangeText={(enterprise) => {}}
                    />
                    <TextInput style={styles.edittext}
                               placeholder="Numéro de téléphone VISIORANK"
                               underlineColorAndroid='transparent'
                               returnKeyLabel = {"next"}
                               onChangeText={(phone) => {}}
                    />
                    <TextInput style={styles.edittext}
                               placeholder="Email"
                               underlineColorAndroid='transparent'
                               returnKeyLabel = {"next"}
                               onChangeText={(email) => {}}
                    />
                    <TextInput style={styles.edittext}
                               placeholder="Mot de passe IMAP"
                               underlineColorAndroid='transparent'
                               returnKeyLabel = {"next"}
                               onChangeText={(imap) => {}}
                    />
                    <TextInput style={styles.edittext}
                               placeholder="Mot de passe"
                               underlineColorAndroid='transparent'
                               returnKeyLabel = {"next"}
                               secureTextEntry
                               onChangeText={(password) => {}}
                               />
                    <TouchableOpacity
                        style={styles.buttonSubmit}
                        onPress={this.onPress}>
                        <Text style={styles.buttonText}>Ajouter</Text>
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
    error: state.sites.error
});

export default connect(mapStateToProps)(UserCreateContainer);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
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
        marginBottom: 20
    }
});