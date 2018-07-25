import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { createBottomTabNavigator  } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GRIS_TEXT } from '../../../commons/colors';
import AttachmentContainer from '../attachment/attachment.container';
import HistoryContainer from '../history/history.container';
import DemandCreateContainer from '../create/demand.create.container';
import {connect} from "react-redux"
import {withNavigation} from 'react-navigation'
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
    NAVIGATION_TYPE_DEMAND_CREATE, NAVIGATION_TYPE_DEMAND_UPDATE, NAVIGATION_TYPE_USER_UPDATE
} from "../../../commons/constant";
import {createDemand} from "../../../store/actions/demands.create.action";
import {updateDemand} from "../../../store/actions/demands.update.action";

class DemandeParentContainer extends Component{

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

        const {pageType, demand, updateDemands} = this.props.navigation.state.params;
        this.setState(
            {   
                pageType: pageType,
                demand: demand
            }
        );
    }

    updateUI  = (data) => {
        
        alert(`update UI cLICKED with data ${data}`);

    };

    onBackPressed = () => {
        this.props.navigation.goBack();
    }

    onCreateOrEditDemandPressed = () => {
        
        if (this.state.pageType === NAVIGATION_TYPE_DEMAND_CREATE) {
            this.onCreateDemand()
        } else {
            this.onUpdateDemand()
        }

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

    render() {
        const {pageType, demand, updateDemands} = this.props.navigation.state.params;

        const TabsDemande = tabsDemande(pageType, demand, updateDemands, this.updateUI);
        return (
            
            <View style={{flex: 1}}>

                <View style={{height: 40, marginTop: 0}}> 
                    
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

                    <TouchableOpacity
                        style={styles.containericonright}
                        underlayColor='transparent'
                        onPress={this.onCreateOrEditDemandPressed}>
                        <Icon name="check-circle" style={styles.iconright}/>
                    </TouchableOpacity>

                </View>

                <TabsDemande />

            </View>
            
        );

    }

}
const tabsDemande = (pageType, demand, updateDemands, updateUi) => createBottomTabNavigator(
    { 
        DemandeCreateTab: {
            screen: props => <DemandCreateContainer {...props} pageType={pageType} demand={demand} updateDemands={updateDemands} updateUi={updateUi} />,
            navigationOptions: {
                title: '',  
            }
        },
        DemandeAttachmentTab: {
            screen: props => <AttachmentContainer {...props} pageType={pageType} />,
            navigationOptions: {
                title: '',
            }
        },
        DemandeHistoryTab: {
            screen: HistoryContainer,
            navigationOptions: {
                title: '',
            }
        }
    },
    {
        navigationOptions: ({ navigation }) => ({
           
          tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'DemandeCreateTab') {
                iconName = 'info';
            } else if (routeName === 'DemandeAttachmentTab') {
                iconName = 'paperclip';
            } else if (routeName === 'DemandeHistoryTab') {
                iconName = 'history';
            } 
     
            // You can return any component that you like here! We usually use an
            // icon component from react-native-vector-icons
            return <Icon name={iconName} style={[{fontSize: 30}, {color: focused ? 'orange' : GRIS_TEXT}]} />;
          },
          
        }),
        tabBarOptions: {
            activeTintColor: 'orange',
            inactiveTintColor: GRIS_TEXT,
            showLabel:false,
            style:{
                height:40,
                backgroundColor: '#fff',
                shadowRadius: 6,
                shadowOpacity: 1,
                shadowColor: 'rgba(0,0,0,0.24)',
                shadowOffset: {
                    width: 0,
                    height: 3
                }
            },
            indicatorStyle: {
                backgroundColor: '#000',
            },
        },
        swipeEnabled: false,
    }
);

const mapStateToProps = state => ({
    demandCreateResponse: state.demandCreate.response,
    demandCreateLoading: state.demandCreate.loadingOnCreateUser,
    demandCreateError: state.demandCreate.error,
    demandUpdateResponse: state.demandUpdate.response,
    demandUpdateLoading: state.demandUpdate.loadingOnUpdateUser,
    demandUpdateError: state.demandUpdate.error,
});

export default withNavigation (connect(mapStateToProps)(DemandeParentContainer));

const styles = StyleSheet.create({
    containericontop: {
        position: 'absolute',
        top: 5,
        left: 25,
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40, 
    },
    containericonright: {
        position: 'absolute',
        top: 5,
        right: 25,
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
    },
    icontop: {
        fontSize: 35,
        color: 'grey',
    },
    iconright: {
        fontSize: 35,
        color: 'grey',
    },
    bigtitle: { 
        textAlign: 'center',
        color: '#939393',
        fontSize: 14,  
        fontWeight: 'bold',
        marginTop: 15
    }
});