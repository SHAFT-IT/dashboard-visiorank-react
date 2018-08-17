import React from 'react'
import {connect} from 'react-redux'
import {ListView, View, TouchableOpacity, Text} from 'react-native'
import {fetchDemandes} from '../../../store/actions/demandes.actions'
import {changeStatusDemande, changePriorityDemande} from '../../../store/actions/demandes.actions'
import Loader from '../../loader/Loader'
import DemandeItem from './demande.item.component'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './demande.style';
import {
    NAVIGATION_TYPE_DEMAND_CREATE, NAVIGATION_TYPE_DEMAND_UPDATE,
} from "../../../commons/constant";
import Modal from "react-native-modal"
import StatusList from '../status/status.list.component'
import PrioriteList from '../priorite/priorite.list.component'
import FilterComponent from "../filter/demand.filter.component";

class Demandes extends React.Component {

    constructor(props) {
        super(props)
        let {items} = props
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds.cloneWithRows(items),
            items,
            demande: {},
            isModalVisible: false,
            isFilterVisible: false,
            status: false,
            priority: false,
            isFromFilter: false
        }
    }

    componentWillReceiveProps({items}) {
        if (items !== this.props.items) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items),
                items
            })
        }
    }

    updateDemands = () => {
        const {token} = this.props
        this.props.dispatch(fetchDemandes(token));
    };

    /**
     * Fetch items when component is mounted
     */
    componentDidMount() {
        const {token} = this.props
        this.props.dispatch(fetchDemandes(token));
    }

    showFilter = (visibility, state = {demands: []}, dismiss = false) => {
        this.setState({
            isFilterVisible: visibility,
        });
        if (!visibility) {
            if (!dismiss) {
                this.setState({
                    isFromFilter: true,
                    dataSource: this.state.dataSource.cloneWithRows(state.demands),
                });
            }
        }
    }

    showModal = (visibility, state = {status: false, priority: false, statusId: 0, priorityId: 0}) => {
        const {currentDemande} = this.props
        this.setState({
            isModalVisible: visibility,
            status: state.status,
            priority: state.priority,
        });
        if (!visibility) {
            if (state.status && state.statusId)
                this.props.dispatch(changeStatusDemande(state.statusId, currentDemande.ticket_id))
            if (state.priority && state.priorityId)
                this.props.dispatch(changePriorityDemande(state.priorityId, currentDemande.ticket_id))
        }
    }

    onPressNewDemand = () => {
        this.props.navigation.navigate('DemandCreate', {
            demand: {},
            pageType: NAVIGATION_TYPE_DEMAND_CREATE,
            updateDemands: this.updateDemands
        });
    }

    onPressEditDemand = (demand) => {

        this.props.navigation.navigate('DemandCreate', {
            demand: {demand},
            pageType: NAVIGATION_TYPE_DEMAND_UPDATE,
            updateDemands: this.updateDemands
        });
    }

    onUpdateStatus = () => {
        this.showModal(true, {status: true})
    }

    onShowFilter = () => {
        const {isFromFilter} = this.state
        const {items} = this.props
        if (isFromFilter) {
            this.setState({
                isFromFilter: false,
                dataSource: this.state.dataSource.cloneWithRows(items),
                items
            });
        } else {
            this.showFilter(true, {})
        }
    }

    onUpdatePriority = () => {
        this.showModal(true, {priority: true})
    }

    /**
     * Render component
     * @returns {*}
     */
    render() {
        const {loading, items} = this.props
        const {isFromFilter} = this.state


        if (loading) {
            return <Loader loading={loading}/>
        }
        return (
            <View style={{flex: 1}}>
                <ListView enableEmptySections={true}
                          dataSource={this.state.dataSource}
                          renderRow={item => <DemandeItem
                              item={item}
                              onPressEditDemand={this.onPressEditDemand}
                              onUpdateStatus={this.onUpdateStatus}
                              onUpdatePriority={this.onUpdatePriority}
                          />
                          }/>
                <Modal isVisible={this.state.isModalVisible} transparent={true}>
                    <TouchableOpacity onPress={() => this.showModal(false, {})} style={{flex: 1}}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10
                        }}>
                            {this.state.status && <StatusList showModal={this.showModal}/>}
                            {this.state.priority && <PrioriteList showModal={this.showModal}/>}
                        </View>
                    </TouchableOpacity>
                </Modal>
                <Modal isVisible={this.state.isFilterVisible} transparent={true}>
                    <TouchableOpacity onPress={() => this.showFilter(false, {}, true)} style={{flex: 1}}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10
                        }}>
                            <FilterComponent demands={items} showFilter={this.showFilter}/>
                        </View>
                    </TouchableOpacity>
                </Modal>
                <TouchableOpacity style={styles.filterStyle}
                                  underlayColor='transparent'
                                  onPress={this.onShowFilter}>
                    <Icon name={isFromFilter ? "search-minus" : "search-plus"} style={styles.iconFilter}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchableStyle}
                                  underlayColor='transparent'
                                  onPress={this.onPressNewDemand}>
                    <Icon name="plus-circle" style={styles.iconAdd}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.demandes.items || [],
        loading: state.demandes.loading,
        token: state.login.item.mobile_token,
        currentDemande: state.demandes.current
    }
}

export default connect(mapStateToProps)(Demandes)
