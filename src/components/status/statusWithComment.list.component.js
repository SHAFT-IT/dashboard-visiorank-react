import React, {Component} from 'react'
import {ListView, View, Text, TextInput, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {fetchStatus} from '../../store/actions/status.action';
import Loader from '../loader/Loader';
import StatusItem from './status.item.component'
import moment from 'moment';

moment.locale('fr');

class StatusListWithComments extends Component {

    constructor(props) {
        super(props)
        const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.items),
            activeIndex: parseInt(props.demand.demand.statut_id, 10),
            comment: ''
        };
    }

    getItems = (items) => {
        const {activeIndex} = this.state
        // STATUT_BROUILLON_KEY
        if (activeIndex === 1) {
            return items.filter(item => parseInt(item.statut_id, 10) > 1)
        }
        // STATUT_PRISE_EN_CHARGE_KEY
        if (activeIndex === 2) {
            return items.filter(item => [1, 4, 6].includes(parseInt(item.statut_id, 10)))
        }
        // STATUT_REFUSE_KEY
        if (activeIndex === 3) {
            return items.filter(item => [1, 6].includes(parseInt(item.statut_id, 10)))
        }
        // STATUT_LIVRE_KEY
        if (activeIndex === 4) {
            return items.filter(item => [1, 5, 3, 6].includes(parseInt(item.statut_id, 10)))
        }
        // STATUT_VALIDE_KEY
        if (activeIndex === 5) {
            return items.filter(item => [1, 6].includes(parseInt(item.statut_id, 10)))
        }
        // STATUT_CLOS_KEY
        if (activeIndex === 6) {
            return items.filter(item => parseInt(item.statut_id, 10) === 1)
        }

        return items
    }

    componentWillReceiveProps({items}) {
        if (items !== this.props.items) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.getItems(items)),
                items,
            })
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchStatus())
    }

    render() {
        const {loading, demand, getComment} = this.props
        if (loading) {
            return <Loader loading={true}/>
        }
        const current = demand.demand
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Modification du statut de la
                        demande</Text>
                    <Text style={styles.actualStatus}>Statut actuel
                        : {current.status}</Text>
                    <TextInput style={styles.textArea}
                               placeholder="Laissez un commentaire (optionnel)"
                               underlineColorAndroid='transparent'
                               multiline={true}
                               value={this.state.comment}
                               onChangeText={value => {
                                   getComment(value)
                                   this.setState({
                                       comment: value,
                                   })
                               }}

                    />
                    <Text style={styles.newStatus}>{this.state.comment}</Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={item => <StatusItem item={item}
                                                   showModal={this.props.showModal}/>}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.status.loading,
    items: state.status.items,
})

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 'auto',
        borderRadius: 5,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#fff'
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20
    },
    actualStatus: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    newStatus: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textArea: {
        textAlignVertical: 'top',
        margin: 20,
        fontSize: 10,
        textAlign: 'left',
        height: 150,
        borderRadius: 6,
        borderWidth: 1,
        paddingLeft: 15,
        borderColor: '#939393',
    },
})

export default connect(mapStateToProps)(StatusListWithComments)
