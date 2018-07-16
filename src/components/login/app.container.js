import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './login.component';
import { authenticate } from '../../store/actions/login.action';
import Loader from '../loader/Loader';
import { NavigationActions, DrawerActions } from 'react-navigation';
import PropTypes from 'prop-types';
import Drawer from "../appdrawer/config/navigation";

class LoginContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {isShowingText: true};
    }

    render() {  
        const { login, logoutSuccess, loadingLogout, loading, response } = this.props;
        
        if (loadingLogout) {
            return <Loader loading={true} />
        }

        if (response.user && response.user.mobile_token) {
            return <Drawer/>
        }

        return <Login login={login} loading={loading} response={response}/>
    }

    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
          routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }
    
}

const mapDispatchToProps = dispatch => ({
   login: (email, password) => dispatch(authenticate(email, password))
})

const mapStateToProps = state => ({
    loading: state.login.loading,
    response: state.login.item,
    loadingLogout: state.logout.loading,
    logoutSuccess: state.logout.logoutSuccess
})

LoginContainer.propTypes = {
    navigation: PropTypes.object
};
  

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
  