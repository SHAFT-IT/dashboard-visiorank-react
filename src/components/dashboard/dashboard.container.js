import React, { Component } from 'react'
import { Text, View } from 'react-native';
import { Dashboard } from './dashboard.component';
import { connect } from 'react-redux';
import { fetchDashboard } from '../../store/actions/dashboard.action'
import Loader from '../loader/Loader';
import { CLICK_DASHBOARD_VISITE, CLICK_DASHBOARD_MESSAGE, CLICK_DASHBOARD_APPEL, CLICK_DASHBOARD_DEMANDE } from '../../commons/constant';
import PropTypes from 'prop-types';
import { NavigationActions, DrawerActions } from 'react-navigation';

class DashboardContainer extends Component{

    navigateToScreen = (route) => () => {
        console.log('HERE NOW 1');
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
       
    }

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
                //with button back
                //this.props.navigation.navigate('MessagesContainer');
                //without button back 
                console.log('HERE NOW');
                //this.navigateToScreen('Message');
                this.props.navigation.navigate('Message');
                break;

            case CLICK_DASHBOARD_APPEL:
            this.props.navigation.navigate('Appel');
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

DashboardContainer.propTypes = {
    navigation: PropTypes.object
};
  
export default connect(mapStateToProps)(DashboardContainer)
//<Dashboard/>  