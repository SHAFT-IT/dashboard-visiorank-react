import React, { Component } from 'react'
import { Text, View } from 'react-native';
import { Dashboard } from './dashboard.component';
import { connect } from 'react-redux';
import { fetchDashboard } from '../../store/actions/dashboard.action'
import Loader from '../loader/Loader';

 class DashboardContainer extends Component{

    componentDidMount() {
        const { token } = this.props
        this.props.dispatch(fetchDashboard(token));
    }

    render() {
        const {items, loading} = this.props
        if (loading) {
            return <Loader loading={loading}/>
        }
        return (
            <View >
                <Dashboard visitesCount={items[0]} callCount={items[1]} messagesCount={items[2]} demandesCount={items[3]}/>  
            </View>   
        );
    }
}

const mapStateToProps = state => ({
    items: state.dashboard.items,
    loading: state.dashboard.loading,
    token: state.login.item.mobile_token
})

export default connect(mapStateToProps)(DashboardContainer)
//<Dashboard/>  