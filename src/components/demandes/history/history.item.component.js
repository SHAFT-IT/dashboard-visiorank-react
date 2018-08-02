import React from 'react'
import {Text, View, TouchableOpacity, TouchableHighlight, Alert} from 'react-native'
import Accordion from 'react-native-collapsible/Accordion';
import styles from './history.style';
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
} from '../../../commons/constant';

class HistoryItem extends React.Component {
    state = {
        expanded: false
    }

    _toStringStatus = (item) => {
        switch (parseInt(item.historique_statut)) {
            case DEMANDE_STATUT_BROUILLON_KEY:
                return "Brouillon"
            case DEMANDE_STATUT_PRISE_EN_CHARGE_KEY:
                return "Pris en charge"
            case DEMANDE_STATUT_LIVRE_KEY:
                return "Livré"
            case DEMANDE_STATUT_VALIDE_KEY:
                return "Validé"
            case DEMANDE_STATUT_CLOS_KEY:
                return "Clos"
            case DEMANDE_STATUT_REFUSE_KEY:
                return "Refusé"    
            default:
                break
        }
    }

    _renderSectionTitle = (item) => {
        return (
            <View style={styles.content}>
                <Text>{item.titre}</Text>
            </View>
        );
    }

    _renderHeader = (item) => {
        switch (parseInt(item.historique_statut)) {
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
            <View style={{
                flex: 1,
                flexDirection: 'column',
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                    }}>
                        <Text style={styles.headerText}>
                            {moment(item.historique_date).format("DD/MM/YYYY")}
                        </Text>
                        <TouchableHighlight style={[styles.btnStatus, {backgroundColor: statusBgColor}]}>
                            <Text style={[styles.buttonText, {color: buttonTextColor}]}>
                                {this._toStringStatus(item)}
                            </Text>
                        </TouchableHighlight>

                    </View>
                    <Icon name="chevron-down" style={[styles.iconMore]}/>
                </View>
                <View style={styles.separator}/>
            </View>

        );
    }

    _renderContent(item) {
        return (
            <Text
                style={{alignSelf: 'flex-start', margin: 20}}>{item.historique_comment}</Text>
        );
    }

    render() {
        const {item} = this.props
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
                    />
                </View>
                <View style={{marginBottom : 5,
                    height: 1,
                    backgroundColor: "white"}}/>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    currentDemande: state.demandes.current
})

export default connect(mapStateToProps)(HistoryItem)



