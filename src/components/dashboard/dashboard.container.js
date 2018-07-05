import React, { Component } from 'react'
import { Text, View } from 'react-native';
import { Dashboard } from './dashboard.component';
import { connect } from 'react-redux';
import { fetchDashboard } from '../../store/actions/dashboard.action'
import Loader from '../loader/Loader';
import { CLICK_DASHBOARD_VISITE, CLICK_DASHBOARD_MESSAGE, CLICK_DASHBOARD_APPEL, CLICK_DASHBOARD_DEMANDE } from '../../commons/constant';

 class DashboardContainer extends Component{

    componentDidMount() {
        const { token } = this.props
        this.props.dispatch(fetchDashboard(token));
    }

    onClickItem = (name) => {
        console.log(name)
        switch (name) {
            case CLICK_DASHBOARD_VISITE:
                
                break;
        
            case CLICK_DASHBOARD_MESSAGE:

                break;

            case CLICK_DASHBOARD_APPEL:

                break;

            case CLICK_DASHBOARD_DEMANDE:

                break;
            default:
                break;
        }
    } 

    render() {
        const {items, loading} = this.props
        if (loading) {
            return <Loader loading={loading}/>
        }
        return (
            <View >
                <Dashboard onClickItem={this.onClickItem} visitesCount={items[0]} callCount={items[1]} messagesCount={items[2]} demandesCount={items[3]}/>  
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