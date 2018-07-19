import React from 'react'
import {Text, View, TouchableOpacity, TouchableHighlight, Alert} from 'react-native'
import Accordion from 'react-native-collapsible/Accordion';
import styles from './demande.style';
import moment from 'moment';
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    DEMANDE_STATUT_BROUILLON_KEY,
    DEMANDE_STATUT_PRISE_EN_CHARGE_KEY,
    DEMANDE_STATUT_REFUSE_KEY,
    DEMANDE_STATUT_LIVRE_KEY,
    DEMANDE_STATUT_VALIDE_KEY,
    DEMANDE_STATUT_CLOS_KEY,
    DEMANDE_PRIORITE_HAUTE_KEY,
    DEMANDE_PRIORITE_NORMAL_KEY,
    DEMANDE_PRIORITE_BASSE_KEY, NAVIGATION_TYPE_DEMAND_UPDATE
} from '../../../commons/constant';
import {deleteDemande, changeCurrentDemande} from '../../../store/actions/demandes.actions'

class DemandeItem extends React.Component {
    state = {
        expanded: false
    }
    deleteDemande = (demande) => {
        Alert.alert(
            '',
            'Etes-vous sur de vouloir supprimer cette demande ?',
            [
                {text: 'Annuler', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => this.props.dispatch(deleteDemande(demande.ticket_id))},
            ],
            {cancelable: false}
        )
    }


    toggle = () => {
        this.setState({expanded: !this.state.expanded})
    }

    _renderSectionTitle = (item) => {
        return (
            <View style={styles.content}>
                <Text>{item.titre}</Text>
            </View>
        );
    }
    _renderHeader = (item) => {
        const {onUpdateStatus, onUpdatePriority} = this.props

        switch (parseInt(item.statut_id)) {
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

        switch (parseInt(item.priorite_id)) {
            case DEMANDE_PRIORITE_HAUTE_KEY:
                prioriteBgColor = '#d9534f';
                priotiteTextColor = '#fff';
                break;
            case DEMANDE_PRIORITE_NORMAL_KEY:
                prioriteBgColor = '#31b0d5';
                priotiteTextColor = '#fff';
                break;
            case DEMANDE_PRIORITE_BASSE_KEY:
                prioriteBgColor = '#e6e6e6';
                priotiteTextColor = '#000';
                break;
            default:
                prioriteBgColor = '#31b0d5';
                priotiteTextColor = '#fff';
        }

        return (
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerText} numberOfLines={2}>Demande #{item.ticket_id} - {item.titre}</Text>
                </View>
                <View style={styles.buttonHeader}>
                    <TouchableHighlight style={[styles.bsubmit1, {backgroundColor: statusBgColor}]}
                                        onPress={() => {
                                            this.props.dispatch(changeCurrentDemande(item))
                                            onUpdateStatus()
                                        }}>
                        <Text style={[styles.buttonText, {color: buttonTextColor}]}>
                            {item.status}  <Icon name="chevron-down" style={[styles.icontop, {color: buttonTextColor}]}/>
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.bsubmit1, {backgroundColor: '#fff'}]}>
                        <Text style={[styles.buttonText, {color: '#000'}]}>{item.type}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.bsubmit1, {backgroundColor: prioriteBgColor}]}
                                        onPress={() => {
                                            this.props.dispatch(changeCurrentDemande(item))
                                            onUpdatePriority()
                                        }}>
                        <Text style={[styles.buttonText, {color: priotiteTextColor}]}>
                            {item.priority}  <Icon name="chevron-down" style={[styles.icontop, {color: priotiteTextColor}]}/>
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    _renderContent(item) {
        const dateCreation = moment(item.date_creation).format('Do MMM YY')
        const dateModification = moment(item.date_modification).format('Do MMM YY')

        return (
            <View style={styles.content}>
                <Text style={styles.contentList}>Date de création : {dateCreation}</Text>
                <Text style={styles.contentList}>Date de dernière modification : {dateModification}</Text>
                <Text style={styles.contentList}>Propriétaire : {item.prenom} {item.nom}</Text>
            </View>
        );
    }

    render() {
        const {item, onPressEditDemand, onUpdatePriority, onUpdateStatus} = this.props
        return (
            <View>
                <View>
                    <Accordion
                        activeSection={this.state.activeSection}
                        sections={[item]}
                        touchableComponent={TouchableOpacity}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                        duration={400}
                        onUpdateStatus={onUpdateStatus}
                        onUpdatePriority={onUpdatePriority}
                    />
                </View>
                <View style={styles.buttonContentHeader}>
                    <TouchableOpacity style={styles.buttonContent1} onPress={() => onPressEditDemand(item)}>
                        <Text><Icon name="edit" style={styles.iconItemLeft}/></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContent2} onPress={() => this.deleteDemande(item)}>
                        <Text><Icon name="trash" style={styles.iconItemLeft}/></Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerItemDevider}/>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    currentDemande: state.demandes.current
})

export default connect(mapStateToProps)(DemandeItem)
