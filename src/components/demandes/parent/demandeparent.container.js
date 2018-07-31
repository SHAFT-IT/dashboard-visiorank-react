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
import Loader from '../../loader/Loader'
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
import {createDemand, createDemandReset} from "../../../store/actions/demands.create.action";
import {updateDemand} from "../../../store/actions/demands.update.action";
import LoaderDelete from '../../loader/LoaderDelete';
import {fetchDemandDetail, fetchDemandDetailReset} from '../../../store/actions/demands.detail.action';
import {getData} from '../../../commons/preferences';
import {updateDemandReset} from "../../../store/actions/demands.update.action";
import styles from './demandeparent.style';

class DemandeParentContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pageType: null,
            detailResponse: {},
            demand: {},
        }

        this.result = {
            user: {},
            userId: -1,
            titre: '',
            description: '',
            selectedType: -1,
            selectedPriority: -1,
            demand: {},
            uploads: []
        };
    }

    componentDidMount() {

        const {pageType, demand} = this.props.navigation.state.params;
        this.setState(
            {   
                pageType: pageType,
                demand: demand
            }
        );

        this.init(pageType, demand);

    }

    init = (pageType, demand) => {
        
        if (demand && pageType === NAVIGATION_TYPE_DEMAND_UPDATE) {
            
            this.props.dispatch(fetchDemandDetail(demand.demand.ticket_id));
            
        } else if (!demand || pageType === NAVIGATION_TYPE_DEMAND_CREATE) {

            getData('user')
            .then(user => {
                if (user.type === '1') {
                    this.props.dispatch(fetchDemandDetail(0))
                } 
            })
            .catch(error => console.log("error getting user"))

        }
    }

    componentWillReceiveProps({
        demandDetailResponse,
        demandCreateResponse,
        demandUpdateResponse,
        demandDetailError,
        demandCreateError,
        demandUpdateError,
    })
    {

        
        if (demandDetailResponse && demandDetailResponse !== this.props.demandDetailResponse) {
        
            this.setState(
                {
                    detailResponse: demandDetailResponse
                }
            );
        
        }
        
        if(demandDetailError){
            this.props.dispatch(fetchDemandDetailReset())
        }
        
        if (demandCreateResponse) {
            if (demandCreateResponse.code == 200) {
                this.props.navigation.goBack()
                this.props.navigation.state.params.updateDemands()
            } else {
                alert("Erreur ajout ...")
            }
            this.props.dispatch(createDemandReset())
        }

        if (demandUpdateResponse) {
            if (demandUpdateResponse.code == 200) {
                this.props.navigation.goBack();
                this.props.navigation.state.params.updateDemands()
            } else {
                alert("Erreur modification ...")
            }
            this.props.dispatch(updateDemandReset())
        }

        if (demandCreateError) {
            alert("Erreur ajout ...")
            this.props.dispatch(createDemandReset())
        }

        if (demandUpdateError) {
            alert("Erreur modification ...")
            this.props.dispatch(updateDemandReset())
        }
        
    }

    updateUI  = (key, data) => {
        
        switch (key) {
            case 'titre':
                this.result.titre = data;
                break;
        
            case 'description':
                this.result.description = data;
                break;

            case 'user':
                this.result.user = data;
                break;

            case 'userId':
                this.result.userId = data;
                break;

            case 'demand':
                this.result.demand = data;
                this.result.titre = data.titre;
                this.result.description = data.description;
                this.result.selectedType = data.type_id-1;
                this.result.selectedPriority = data.priorite_id-1;
                this.result.userId = data.user_id;
                break;

            case 'selectedType':
                this.result.selectedType = data;
                break;

            case 'selectedPriority':
                this.result.selectedPriority = data;
                break;

            case 'uploads':
                this.result.uploads = data;
                break;

            default:
                break;
        }
        
            
    };

    onBackPressed = () => {
        this.props.navigation.goBack();
    }

    onCreateOrEditDemandPressed = () => {
        
        if (this.state.pageType === NAVIGATION_TYPE_DEMAND_CREATE) {
            this.onCreateDemand()
            //alert(`CREATE with data ${JSON.stringify(this.result)}`);
        } else if (this.state.pageType === NAVIGATION_TYPE_DEMAND_UPDATE) {
            this.onUpdateDemand()
            //alert(`UPDATE with data ${JSON.stringify(this.result)}`);
        }

    }

    onCreateDemand = () => {
        const {userId, titre, description, selectedType, selectedPriority, user, uploads} = this.result
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
            newDemand.uploads = uploads;
            this.props.dispatch(createDemand(newDemand))
        }
    }

    onUpdateDemand = () => {
        const {userId, titre, description, selectedType, selectedPriority, user, demand, uploads} = this.result
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
            newDemand.description = description
            newDemand.type = this.toType(selectedType)
            newDemand.priorityId = this.toPriority(selectedPriority)
            if (user.type === '1') {
                newDemand.userId = userId
            } else {
                newDemand.userId = user.id
            }
            newDemand.uploads = uploads;
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

        const { demandDetailLoading, demandDetailError, demandCreateLoading, demandUpdateLoading, demandCreateError, demandUpdateError } = this.props;
        const {pageType, demand, updateDemands} = this.props.navigation.state.params;

        const TabsDemande = tabsDemande(pageType, demand, updateDemands, this.updateUI, this.state.detailResponse);
        return (
            
            <View style={{flex: 1}}>

                {(demandDetailError || demandCreateError || demandUpdateError) && (
                    alert("Erreur lor du traitement !")
                )} 

                {(demandCreateLoading || demandUpdateLoading || demandDetailLoading) && (
                    <Loader loading={demandCreateLoading || demandUpdateLoading || demandDetailLoading}/>)
                }

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
const tabsDemande = (pageType, demand, updateDemands, updateUi, detailResponse) => createBottomTabNavigator(
    { 
        DemandeCreateTab: {
            screen: props => <DemandCreateContainer {...props} pageType={pageType} demand={demand} updateDemands={updateDemands} updateUi={updateUi} detailResponse={detailResponse} />,
            navigationOptions: {
                title: '',  
            }
        },
        DemandeAttachmentTab: {
            screen: props => <AttachmentContainer {...props} pageType={pageType} updateUi={updateUi} detailResponse={detailResponse} />,
            navigationOptions: {
                title: '',
            }
        },
        DemandeHistoryTab: {
            screen: props => <HistoryContainer {...props} pageType={pageType} detailResponse={detailResponse} />,
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
    demandDetailResponse: state.demandDetail.demandDetailResponse,
    demandDetailLoading: state.demandDetail.demandDetailLoading,
    demandDetailError: state.demandDetail.demandDetailError,
    demandCreateResponse: state.demandCreate.response,
    demandCreateLoading: state.demandCreate.loadingOnCreateUser,
    demandCreateError: state.demandCreate.error,
    demandUpdateResponse: state.demandUpdate.response,
    demandUpdateLoading: state.demandUpdate.loadingOnUpdateUser,
    demandUpdateError: state.demandUpdate.error,
});

export default withNavigation (connect(mapStateToProps)(DemandeParentContainer));

