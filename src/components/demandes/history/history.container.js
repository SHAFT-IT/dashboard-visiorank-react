import React, {Component} from 'react'
import {View, Text, ListView,} from 'react-native'
import styles from './history.style';
import {
    DEMANDE_STATUT_BROUILLON_KEY, DEMANDE_STATUT_CLOS_KEY,
    DEMANDE_STATUT_LIVRE_KEY,
    DEMANDE_STATUT_PRISE_EN_CHARGE_KEY, DEMANDE_STATUT_VALIDE_KEY
} from "../../../commons/constant";
import HistoryItem from './history.item.component'


export default class HistoryContainer extends Component {

    constructor(props) {
        super(props)
        const {detailResponse} = props
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds.cloneWithRows(detailResponse.histories),
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <ListView enableEmptySections={true}
                          dataSource={this.state.dataSource}
                          renderRow={item =>
                              <HistoryItem item={item}/>
                          }/>
            </View>
        );
    }
}

