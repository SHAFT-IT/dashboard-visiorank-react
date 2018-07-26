import React, {Component} from 'react'
import {connect} from "react-redux"
import Loader from '../../loader/Loader'
import {withNavigation} from 'react-navigation'
import {
    View, Text, TouchableHighlight, TouchableOpacity, ScrollView, TextInput, StyleSheet, Keyboard
} from 'react-native'
import {
    DEMANDE_PRIORITE_BASSE_KEY,
    DEMANDE_PRIORITE_HAUTE_KEY,
    DEMANDE_PRIORITE_NORMAL_KEY,
    DEMANDE_TYPE_CORRECTION_KEY,
    DEMANDE_TYPE_DEMANDEINFO_KEY,
    DEMANDE_TYPE_EVOLUTION_KEY,
    DEMANDE_TYPE_NONE_KEY,
    DEMANDE_STATUT_BROUILLON_KEY,
    DEMANDE_STATUT_PRISE_EN_CHARGE_KEY,
    DEMANDE_STATUT_REFUSE_KEY,
    DEMANDE_STATUT_LIVRE_KEY,
    DEMANDE_STATUT_VALIDE_KEY,
    DEMANDE_STATUT_CLOS_KEY,
    NAVIGATION_TYPE_DEMAND_CREATE,
    NAVIGATION_TYPE_DEMAND_UPDATE,
    NAVIGATION_TYPE_USER_UPDATE,
    DEMANDE_STATUT_BROUILLON_VALUE
} from "../../../commons/constant";
import {getData} from '../../../commons/preferences';
import Autocomplete from 'react-native-autocomplete-input';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ButtonGroup} from 'react-native-elements';
import {fetchDemandDetail} from '../../../store/actions/demands.detail.action';
import {changePriorityDemande, changeStatusDemande} from "../../../store/actions/demandes.actions";
import Modal from "react-native-modal"
import StatusListWithComments from '../../status/statusWithComment.list.component'

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
            demand: {},
            isModalVisible: false,
            status: false,
            comment: '',
        }
    }

    componentDidMount() {
        getData('user')
            .then(user => {
                this.setState({user: user});
                this.props.updateUi('user', user);
                if (user.type === '1') {
                    this.props.dispatch(fetchDemandDetail(0))
                } else if (user.type === '0') {
                    this.setState({userId: user.id});
                    this.props.updateUi('userId', user.id);
                }
            })
            .catch(error => console.log("error"))

        this.init();

    }

    componentWillReceiveProps({
                                  demandCreateResponse,
                                  demandUpdateResponse,
                                  demandCreateError,
                                  demandUpdateError,
                                  demandDetailResponse
                              }) {
        const {pageType, demand} = this.props
        if (pageType === NAVIGATION_TYPE_DEMAND_UPDATE) {
            if (demandDetailResponse && demandDetailResponse.users && demandDetailResponse.users.length > 0) {
                demandDetailResponse.users.map(user => {
                    if (demand.demand.user_id === user.id) {
                        this.setState({query: user.societe});
                        this.props.updateUi('user', user);
                    }
                })
            }
        }
    }

    onUpdateStatus = () => {
        const {pageType, demand} = this.props
        if (demand && pageType === NAVIGATION_TYPE_DEMAND_UPDATE) {
            this.showModal(true, {status: true})
        }
    }

    getComment = (comment) => {
        this.setState({comment: comment})
    }

    showModal = (visibility, state = {status: false, statusId: 0}) => {
        const {demand} = this.props
        this.setState({
            isModalVisible: visibility,
            status: state.status,
            priority: state.priority,
        });
        if (!visibility) {
            if (state.status && state.statusId) this.props.dispatch(changeStatusDemande(state.statusId, demand.demand.ticket_id, this.state.comment))
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
        const {demand, pageType} = this.props;
        if (demand && pageType === NAVIGATION_TYPE_DEMAND_UPDATE) {
            this.props.dispatch(fetchDemandDetail(demand.demand.ticket_id));
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
            this.props.updateUi('demand', demand.demand);

        } else if (!demand || pageType === NAVIGATION_TYPE_DEMAND_CREATE) {

            this.setState({
                pageType: pageType,
                selectedType: -1,
                demand: {status: DEMANDE_STATUT_BROUILLON_VALUE, statut_id: DEMANDE_STATUT_BROUILLON_KEY}
            });
        }
    }

    findUser(query) {
        if (query === '') {
            return [];
        }
        const {demandDetailResponse} = this.props;
        const regex = new RegExp(`${query.trim()}`, 'i');
        console.log('my response =>', demandDetailResponse);
        return demandDetailResponse.users.filter(user => user.societe.search(regex) >= 0);
    }

    onFocus() {
        setTimeout(() => this.scroller.scrollTo({x: 0, y: 240}), 1000);
    }

    updatePriority = (selectedPriority) => {
        this.setState({selectedPriority: selectedPriority});
        this.props.updateUi('selectedPriority', selectedPriority);
    }

    updateType = (selectedType) => {
        if (this.state.pageType === NAVIGATION_TYPE_DEMAND_CREATE) {
            this.setState({selectedType: selectedType});
            this.props.updateUi('selectedType', selectedType);
        }
    }

    render() {
        const {query, pageType, user} = this.state;
        const filteredUser = this.findUser(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        const {demandDetailError, demandDetailLoading} = this.props;
        if (demandDetailError) {
            return (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Erreur !</Text>
                </View>
            )
        }
        if (demandDetailLoading) {
            return (<Loader loading={demandDetailLoading}/>)
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

        switch (parseInt(this.state.demand.statut_id)) {
            case DEMANDE_STATUT_BROUILLON_KEY:
                statusBgColor = '#fff';
                buttonTextColor = '#000';
                break;
            case DEMANDE_STATUT_PRISE_EN_CHARGE_KEY:
                statusBgColor = '#f0ad4e';
                buttonTextColor = '#fff';
                break;
            case DEMANDE_STATUT_REFUSE_KEY:
                statusBgColor = '#d9534f';
                buttonTextColor = '#fff';
                break;
            case DEMANDE_STATUT_LIVRE_KEY:
                statusBgColor = '#5bc0de';
                buttonTextColor = '#fff';
                break;
            case DEMANDE_STATUT_VALIDE_KEY:
                statusBgColor = '#5cb85c';
                buttonTextColor = '#fff';
                break;
            case DEMANDE_STATUT_CLOS_KEY:
                statusBgColor = '#337ab7';
                buttonTextColor = '#fff';
                break;
            default:
                statusBgColor = '#337ab7';
                buttonTextColor = '#fff';
        }

        return (
            <View style={styles.allcontent}>
                <ScrollView keyboardShouldPersistTaps={'handled'} ref={(scroller) => {
                    this.scroller = scroller
                }}>
                    <View>
                        <Modal isVisible={this.state.isModalVisible} transparent={true}>
                            <TouchableOpacity onPress={() => this.showModal(false, {})} style={{flex: 1}}>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 10
                                }}>
                                    {this.state.status &&
                                    <StatusListWithComments showModal={this.showModal}
                                                            getComment={this.getComment}
                                                            demand={this.props.demand}/>}
                                </View>
                            </TouchableOpacity>
                        </Modal>
                        <TouchableHighlight onPress={this.onUpdateStatus}
                                            style={[styles.bsubmit1, {backgroundColor: statusBgColor, marginTop: 20}]}>
                            <Text style={[styles.buttonText, {color: buttonTextColor}]}>
                                Statut de la demande : {this.state.demand.status}
                                <Icon name="chevron-down"
                                      style={[styles.icontopStatus, {color: buttonTextColor}]}/>
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <TextInput style={styles.edittext}
                               placeholder="Titre"
                               underlineColorAndroid='transparent'
                               value={this.state.titre}
                               onChangeText={text => {
                                   this.setState({titre: text});
                                   this.props.updateUi('titre', text);
                               }
                               }
                    />
                    <TextInput style={styles.textArea}
                               placeholder="Description"
                               underlineColorAndroid='transparent'
                               multiline={true}
                               value={this.state.description}
                               onChangeText={text => {
                                   this.setState({description: text});
                                   this.props.updateUi('description', text);
                               }
                               }
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
                                onChangeText={text => {
                                    this.setState({query: text});
                                }
                                }
                                placeholder="Choisir un utilisateur"
                                renderItem={({societe, prenom, nom, id, type}) => (
                                    <TouchableOpacity onPress={() => {
                                        this.setState({query: societe, userId: id});
                                        this.props.updateUi('user', {
                                            id: id,
                                            nom: nom,
                                            prenom: prenom,
                                            societe: societe,
                                            type: type
                                        });
                                        Keyboard.dismiss();
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
                        containerStyle={{height: 35}}/>
                    <Text style={styles.buttonGroupTitle}>Priorité de la demande:</Text>
                    <ButtonGroup
                        selectedButtonStyle={styles.selectedButtonStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        style={styles.buttonGroupContainer}
                        onPress={this.updatePriority}
                        selectedIndex={selectedPriority}
                        buttons={buttonsPriority}
                        buttonStyle={styles.buttonGroupBackground}
                        containerStyle={{height: 35}}/>

                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
        demandDetailResponse: state.demandDetail.demandDetailResponse,
        demandDetailLoading: state.demandDetail.demandDetailLoading,
        demandDetailError: state.demandDetail.demandDetailError,
        demandCreateResponse: state.demandCreate.response,
        demandCreateLoading: state.demandCreate.loadingOnCreateUser,
        demandCreateError: state.demandCreate.error,
        demandUpdateResponse: state.demandUpdate.response,
        demandUpdateLoading: state.demandUpdate.loadingOnUpdateUser,
        demandUpdateError: state.demandUpdate.error,
    })
;

export default withNavigation(connect(mapStateToProps)(DemandCreateContainer));

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
    bsubmit1: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 1,
        marginBottom: 5,
        height: 50,
        borderRadius: 3,
        width: 300,
        padding: 5,
        marginLeft: 30,
        backgroundColor: '#5bc0de',
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center'
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
        fontSize: 10,
        //fontWeight: 'bold',
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
        fontSize: 10,
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
        fontSize: 10,
        //fontWeight: 'bold',
        textAlign: 'center',
    },
    textArea: {
        textAlignVertical: 'top',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        fontSize: 10,
        //fontWeight: 'bold',
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
        fontSize: 35,
        color: 'grey',
    },
    iconright: {
        fontSize: 35,
        color: 'grey',
    },
    icontopStatus: {
        fontSize: 10,
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
    containericonright: {
        position: 'absolute',
        top: 10,
        right: 25,
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
        fontSize: 12,
        //fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonSubmitText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    bigtitle: {
        textAlign: 'left',
        color: '#939393',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 20,
        marginLeft: 70,
        marginTop: 25
    }
});
