import React, {Component} from 'react'
import {View, Text, FlatList, StyleSheet} from 'react-native'
import styles from './history.style';
import {
    DEMANDE_STATUT_BROUILLON_KEY, DEMANDE_STATUT_CLOS_KEY,
    DEMANDE_STATUT_LIVRE_KEY,
    DEMANDE_STATUT_PRISE_EN_CHARGE_KEY, DEMANDE_STATUT_VALIDE_KEY
} from "../../../commons/constant";
import moment from 'moment';

export default class HistoryContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            historyItems: [],
        }
    }

    componentDidMount() {
        const {detailResponse} = this.props
        this.setState({historyItems: detailResponse.histories})
    }

    toStringStatus = (index) => {
        switch (parseInt(index)) {
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
            default:
                break
        }
    }

    renderHeader = () => {
       return (
           <View style={{flex: 1}}>
               <View style={styles.gridViewBlockTitleStyle}>
                   <Text style={styles.gridViewInsideTextTitleDateStyle}> DATE </Text>
                   <Text style={styles.gridViewInsideTextTitleStatusStyle}> STATUT </Text>
                   <Text style={styles.gridViewInsideTextTitleCommentStyle}> COMMENTAIRE </Text>
               </View>
           </View>
       )
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <FlatList
                    data={this.state.historyItems}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={({item}) =>
                        <View style={{flex: 1}}>
                            <View style={styles.gridViewBlockStyle}>
                                <Text style={styles.gridViewInsideTextItemDateStyle}> {moment(item.historique_date).format("DD/MM/YYYY")} </Text>
                                <Text style={styles.gridViewInsideTextItemStatusStyle}> {this.toStringStatus(item.historique_statut)} </Text>
                                <Text style={styles.gridViewInsideTextItemCommentStyle}> {item.historique_comment}</Text>
                            </View>
                        </View>
                    }
                    stickyHeaderIndices={[0]}
                />
            </View>
        );
    }
}

