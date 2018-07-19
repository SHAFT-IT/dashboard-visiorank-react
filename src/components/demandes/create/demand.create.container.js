import React, {Component} from 'react'
import {connect} from "react-redux"
import Loader from '../../loader/Loader'
import {
    View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Keyboard
} from 'react-native'
import {
    DEMANDE_PRIORITE_BASSE_KEY,
    DEMANDE_PRIORITE_HAUTE_KEY,
    DEMANDE_PRIORITE_NORMAL_KEY,
    DEMANDE_TYPE_CORRECTION_KEY,
    DEMANDE_TYPE_DEMANDEINFO_KEY,
    DEMANDE_TYPE_EVOLUTION_KEY,
    DEMANDE_TYPE_NONE_KEY,
    NAVIGATION_TYPE_DEMAND_CREATE, NAVIGATION_TYPE_DEMAND_UPDATE, NAVIGATION_TYPE_USER_UPDATE
} from "../../../commons/constant";
import {getData} from '../../../commons/preferences';
import Autocomplete from 'react-native-autocomplete-input';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ButtonGroup} from 'react-native-elements';
import {fetchUsers} from "../../../store/actions/users.action";
import LoaderCreate from "../../loader/LoaderCreate";
import {AlertError} from "../../alert/AlertError";
import {createDemand} from "../../../store/actions/demands.create.action";
import demandUpdate from "../../../store/reducers/demands.update.reducer";
import {updateDemand} from "../../../store/actions/demands.update.action";

const componentPriorityNormal = () => <Text style={styles.buttonGroup}>Normal</Text>
const componentPriorityLow = () => <Text style={styles.buttonGroup}>Basse</Text>
const componentPriorityHigh = () => <Text style={styles.buttonGroup}>Haute</Text>

const componentTypeInfo = () => <Text style={styles.buttonGroup}>Demande d'informations</Text>
const componentTypeCorrection = () => <Text style={styles.buttonGroup}>Correction</Text>
const componentTypeEvolution = () => <Text style={styles.buttonGroup}>Evolution</Text>

class DemandCreateContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {},
            query: '',
            userId: -1,
            ticketId: 0,
            titre: '',
            description: '',
            selectedType: -1,
            selectedPriority: -1,
            pageType: {},
            demand: {}
        }
    }

    componentDidMount() {
        getData('user')
            .then(user => {
                this.setState({user: user});
                user.type === '1' && (
                    this.props.dispatch(fetchUsers())
                )
                user.type === '0' && (
                    this.setState({userId: user.id})
                )
            })
            .catch(error => console.log("error"))
        this.init()
    }

    componentWillReceiveProps({
                                  demandCreateResponse,
                                  demandUpdateResponse,
                                  demandCreateError,
                                  demandUpdateError,
                                  users
                              }) {
        if (demandCreateResponse) {
            if (demandCreateResponse.code == 200) {
                this.props.navigation.goBack()
                this.props.navigation.state.params.updateDemands()
            } else {
                alert("Une erreur est survenue...")
            }
        }
        if (demandUpdateResponse) {
            if (demandUpdateResponse.code == 200) {
                this.props.navigation.goBack()
                this.props.navigation.state.params.updateDemands()
            } else {
                alert("Une erreur est survenue...")
            }
        }
        if (demandCreateError) {
            alert("Une erreur est survenue...")
        }
        if (demandUpdateError) {
            alert("Une erreur est survenue...")
        }
        const {pageType, demand} = this.props.navigation.state.params
        if (pageType === NAVIGATION_TYPE_DEMAND_UPDATE) {
            if (users && users.length > 0) {
                users.map(user => {
                    if( demand.demand.user_id === user.id)
                        this.setState({query: user.societe})

                })
            }
        }
    }

    initType = (type) => {
        switch (parseInt(type)) {
            case DEMANDE_TYPE_EVOLUTION_KEY:
                return 0
            case DEMANDE_TYPE_CORRECTION_KEY:
                return 1
            case DEMANDE_TYPE_DEMANDEINFO_KEY:
                return 2
            default:
                return -1
        }
    }

    initPriority = (priority) => {
        switch (parseInt(priority)) {
            case DEMANDE_PRIORITE_HAUTE_KEY:
                return 0
            case DEMANDE_PRIORITE_NORMAL_KEY:
                return 1
            case DEMANDE_PRIORITE_BASSE_KEY:
                return 2
            default:
                return -1
        }
    }

    toPriority = (priority) => {
        switch (priority) {
            case 0:
                return DEMANDE_PRIORITE_HAUTE_KEY
            case 1:
                return DEMANDE_PRIORITE_NORMAL_KEY
            case 2:
                return DEMANDE_PRIORITE_BASSE_KEY
            default:
                return -1
        }
    }

    toType = (type) => {
        switch (type) {
            case 0:
                return DEMANDE_TYPE_EVOLUTION_KEY
            case 1:
                return DEMANDE_TYPE_CORRECTION_KEY
            case 2:
                return DEMANDE_TYPE_DEMANDEINFO_KEY
            default:
                return -1
        }
    }

    init = () => {
        const {demand, pageType} = this.props.navigation.state.params
        if (demand && pageType === NAVIGATION_TYPE_DEMAND_UPDATE) {
            this.setState({
                pageType: pageType,
                titre: demand.demand.titre,
                description: demand.demand.description,
                selectedType: this.initType(demand.demand.type_id),
                selectedPriority: this.initPriority(demand.demand.priorite_id),
                userId: demand.demand.user_id,
                ticketId: demand.demand.ticket_id,
                demand: demand.demand
            });
        } else {
            this.setState({
                pageType: pageType,
                selectedType: 1
            });
        }
    }

    findUser(query) {
        if (query === '') {
            return [];
        }
        const {users} = this.props;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return users.filter(user => user.societe.search(regex) >= 0);
    }

    onFocus() {
        setTimeout(() => this.scroller.scrollTo({x: 0, y: 240}), 1000);
    }

    onBackPressed = () => {
        this.props.navigation.goBack();
    }

    onCreateDemand = () => {
        const {userId, titre, description, selectedType, selectedPriority, user} = this.state
        if (titre === '') {
            alert('Veuillez insérer un titre.')
        } else if (description === '') {
            alert('Veuillez insérer une description.')
        } else if (userId === -1 && user.type === '1') {
            alert('Veuillez choisir un utilisateur.')
        } else if (selectedType === -1) {
            alert('Veuillez choisir le type de demande.')
        } else if (selectedPriority === -1) {
            alert('Veuillez choisir la priorité de la demande.')
        } else {
            const newDemand = {}
            newDemand.titre = titre
            newDemand.description = description
            newDemand.type = this.toType(selectedType)
            newDemand.priorityId = this.toPriority(selectedPriority)
            if (user.type === '1') {
                newDemand.userId = userId
            } else {
                newDemand.userId = user.id
            }
            this.props.dispatch(createDemand(newDemand))
        }
    }

    onUpdateDemand = () => {
        const {userId, titre, description, selectedType, selectedPriority, user, demand} = this.state
        if (titre === '') {
            alert('Veuillez insérer un titre.')
        } else if (description === '') {
            alert('Veuillez insérer une description.')
        } else if (userId === -1 && user.type === '1') {
            alert('Veuillez choisir un utilisateur.')
        } else if (selectedType === -1) {
            alert('Veuillez choisir le type de demande.')
        } else if (selectedPriority === -1) {
            alert('Veuillez choisir la priorité de la demande.')
        } else {
            const newDemand = {}
            newDemand.ticketId = demand.ticket_id
            newDemand.titre = titre
            newDemand.titre = titre
            newDemand.description = description
            newDemand.type = this.toType(selectedType)
            newDemand.priorityId = this.toPriority(selectedPriority)
            if (user.type === '1') {
                newDemand.userId = userId
            } else {
                newDemand.userId = user.id
            }
            this.props.dispatch(updateDemand(newDemand))
        }
    }

    onCreateOrEditDemandPressed = () => {
        const {pageType} = this.props.navigation.state.params
        if (pageType === NAVIGATION_TYPE_DEMAND_CREATE) {
            this.onCreateDemand()
        } else {
            this.onUpdateDemand()
        }
    }

    updatePriority = (selectedPriority) => {
        this.setState({selectedPriority: selectedPriority})
    }

    updateType = (selectedType) => {
        this.setState({selectedType: selectedType})
    }

    render() {
        const {query, pageType, user} = this.state;
        const filteredUser = this.findUser(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        const {error, loading, demandCreateLoading, demandUpdateLoading} = this.props;
        if (error) {
            return (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Erreur !</Text>
                </View>
            )
        }
        if (loading || demandCreateLoading || demandUpdateLoading) {
            return (<Loader loading={loading || demandCreateLoading || demandUpdateLoading}/>)
        }
        const buttonsPriority = [
            {element: componentPriorityHigh},
            {element: componentPriorityNormal},
            {element: componentPriorityLow}]
        const buttonsType = [
            {element: componentTypeEvolution},
            {element: componentTypeCorrection},
            {element: componentTypeInfo}]
        const {selectedType, selectedPriority} = this.state
        return (
            <View style={styles.allcontent}>
                < View style={{height: 60}}>
                    {pageType === NAVIGATION_TYPE_DEMAND_CREATE ?
                        <Text style={styles.bigtitle}>Ajouter une demande</Text> :
                        <Text style={styles.bigtitle}>Modifier la demande</Text>
                    }
                    <TouchableOpacity
                        style={styles.containericontop}
                        underlayColor='transparent'
                        onPress={this.onBackPressed}>
                        <Icon name="chevron-circle-left" style={styles.icontop}/>
                    </TouchableOpacity>
                </View>
                <ScrollView keyboardShouldPersistTaps={'handled'} ref={(scroller) => {
                    this.scroller = scroller
                }}>
                    <TextInput style={styles.edittext}
                               placeholder="Titre"
                               underlineColorAndroid='transparent'
                               value={this.state.titre}
                               onChangeText={text => this.setState({titre: text})}
                    />
                    <TextInput style={styles.textArea}
                               placeholder="Description"
                               underlineColorAndroid='transparent'
                               multiline={true}
                               value={this.state.description}
                               onChangeText={text => this.setState({description: text})}
                    />
                    {
                        user.type === '1' && (
                            <Autocomplete
                                onFocus={() => this.onFocus()}
                                autoCapitalize="none"
                                autoCorrect={false}
                                containerStyle={styles.autocompleteContainer}
                                data={filteredUser.length === 1 && comp(query, filteredUser[0].societe) ? [] : filteredUser}
                                defaultValue={query}
                                onChangeText={text => this.setState({query: text})}
                                placeholder="Choisir un utilisateur"
                                renderItem={({societe, prenom, nom, id}) => (
                                    <TouchableOpacity onPress={() => {
                                        this.setState({query: societe, userId: id})
                                        Keyboard.dismiss()
                                    }}>
                                        <Text style={styles.itemText}>
                                            {societe + " - " + prenom + " " + nom}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                                renderTextInput={(props) => (
                                    <TextInput {...props} style={styles.edittextautocomplete}
                                               underlineColorAndroid='transparent'
                                    />)
                                }
                            />
                        )
                    }
                    <Text style={styles.buttonGroupTitle}>Type de la demande:</Text>
                    <ButtonGroup
                        selectedButtonStyle={styles.selectedButtonStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        style={styles.buttonGroupContainer}
                        onPress={this.updateType}
                        selectedIndex={selectedType}
                        buttons={buttonsType}
                        buttonStyle={styles.buttonGroupBackground}
                        containerStyle={{height: 45}}/>
                    <Text style={styles.buttonGroupTitle}>Priorité de la demande:</Text>
                    <ButtonGroup
                        selectedButtonStyle={styles.selectedButtonStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        style={styles.buttonGroupContainer}
                        onPress={this.updatePriority}
                        selectedIndex={selectedPriority}
                        buttons={buttonsPriority}
                        buttonStyle={styles.buttonGroupBackground}
                        containerStyle={{height: 45}}/>
                    <TouchableOpacity
                        style={styles.buttonSubmit}
                        onPress={this.onCreateOrEditDemandPressed}>
                        {pageType === NAVIGATION_TYPE_DEMAND_CREATE ?
                            <Text style={styles.buttonText}>Ajouter</Text> :
                            <Text style={styles.buttonText}>Modifier</Text>
                        }
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
        users: state.users.items,
        loading: state.users.loading,
        error: state.users.error,
        demandCreateResponse: state.demandCreate.response,
        demandCreateLoading: state.demandCreate.loadingOnCreateUser,
        demandCreateError: state.demandCreate.error,
        demandUpdateResponse: state.demandUpdate.response,
        demandUpdateLoading: state.demandUpdate.loadingOnUpdateUser,
        demandUpdateError: state.demandUpdate.error,
    })
;

export default connect(mapStateToProps)(DemandCreateContainer);

const styles = StyleSheet.create({
    richText: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    allcontent: {
        flex: 1,
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
        position: 'relative',
        borderColor: '#939393',
        zIndex: 1
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
    selectedButtonStyle: {
        backgroundColor: 'green',
    },
    selectedTextStyle: {
        color: 'white',
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

    buttonGroupTitle: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    buttonGroupBackground: {},
    buttonGroupContainer: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
    },
    buttonGroup: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textArea: {
        textAlignVertical: 'top',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
        height: 150,
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
