import React from 'react'
import {connect} from 'react-redux'
import {ListView, View, TouchableOpacity} from 'react-native'
import {fetchDemandes} from '../../../store/actions/demandes.actions'
import Loader from '../../loader/Loader'
import DemandeItem from './demande.item.component'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './demande.style';
import {
    NAVIGATION_TYPE_DEMAND_CREATE, NAVIGATION_TYPE_DEMAND_UPDATE,
} from "../../../commons/constant";

class Demandes extends React.Component {

    constructor(props) {
        super(props)
        let {items} = props
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds.cloneWithRows(items),
            items
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

    /**
     * Fetch items when component is mounted
     */
    componentDidMount() {
        const {token} = this.props
        this.props.dispatch(fetchDemandes(token));
    }

    onPressNewDemand = () => {
        this.props.navigation.navigate('DemandCreate', {demand: {}, pageType: NAVIGATION_TYPE_DEMAND_CREATE});
    }

    onPressEditDemand = (demand) => {
        this.props.navigation.navigate('DemandCreate', {demand: {demand}, pageType: NAVIGATION_TYPE_DEMAND_UPDATE});
    }

    /**
     * Render component
     * @returns {*}
     */
    render() {
        const {loading} = this.props
        if (loading) {
            return <Loader loading={loading}/>
        }
        return (
            <View style={{flex:1}}>
                <ListView enableEmptySections={true}
                          dataSource={this.state.dataSource}
                          renderRow={item => <DemandeItem item={item} onPressEditDemand={this.onPressEditDemand}/>}/>
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
        token: state.login.item.mobile_token
    }
}

export default connect(mapStateToProps)(Demandes)
