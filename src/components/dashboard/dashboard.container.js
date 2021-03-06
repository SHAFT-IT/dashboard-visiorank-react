import React, { Component } from 'react';
import { View } from 'react-native';
import { Dashboard } from './dashboard.component';
import { connect } from 'react-redux';
import { fetchDashboard } from '../../store/actions/dashboard.action';
import Loader from '../loader/Loader';
import {
  CLICK_DASHBOARD_APPEL,
  CLICK_DASHBOARD_DEMANDE,
  CLICK_DASHBOARD_MESSAGE,
  CLICK_DASHBOARD_VISITE
} from '../../commons/constant';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { onMenuChanged } from '../../store/actions/menu.action';

class DashboardContainer extends Component {

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  componentDidMount() {
    const { token } = this.props;
    this.props.dispatch(fetchDashboard(token));
  }

  onClickItem = (name) => {
    switch (name) {
      case CLICK_DASHBOARD_VISITE:
        this.props.dispatch(onMenuChanged(2));
        this.props.navigation.navigate('Campagne');
        break;
      case CLICK_DASHBOARD_APPEL:
        this.props.dispatch(onMenuChanged(3));
        this.props.navigation.navigate('Appel');
        break;
      case CLICK_DASHBOARD_MESSAGE:
        this.props.dispatch(onMenuChanged(4));
        this.props.navigation.navigate('Message');
        break;
      case CLICK_DASHBOARD_DEMANDE:
        this.props.dispatch(onMenuChanged(6));
        this.props.navigation.navigate('Demandes');
        break;
      default:
        break;
    }
  };

  render() {
    const { items, loading } = this.props;
    if (loading) {
      return <Loader loading={loading}/>;
    }
    return (
      <View style={{ flex: 1 }}>
        <Dashboard onClickItem={this.onClickItem}
                   visitesCount={items[0]}
                   callCount={items[1]}
                   messagesCount={items[2]}
                   demandesCount={items[3]}/>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  items: state.dashboard.items,
  loading: state.dashboard.loading,
  token: state.login.item.mobile_token
});

DashboardContainer.propTypes = {
  navigation: PropTypes.object
};

export default connect(mapStateToProps)(DashboardContainer);