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
        const { login, loading, user } = this.props;

        if(user && user.mobile_token) {
            return <Drawer/>
        }

        return loading ? <Loader loading={loading} /> : <Login login={login} loading={loading} user={user}/>
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
    user: state.login.item
})

LoginContainer.propTypes = {
    navigation: PropTypes.object
};
  

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
  