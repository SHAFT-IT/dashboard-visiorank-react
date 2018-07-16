import React, { Component } from 'react';
import { NavigationActions, DrawerActions } from 'react-navigation';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import styles from './Sidebar.style';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { logout } from '../../../store/actions/logout.action';
import { connect } from 'react-redux';
import { getData } from '../../../commons/preferences';

class DrawerContent extends Component {

  constructor(props){
    super(props)

    this.state = {
      user: {},
    }
  }

  componentDidMount() {
    
    getData('user')
        .then(user => {
          //user.type
          this.setState({user: user});
        })
        .catch(error => console.log("error"))

  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }

  render() {
    const { token } = this.props
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity style={styles.containerItem} onPress={this.navigateToScreen('Home')}>
            <Icon name="dashboard" style={styles.iconItemLeft}/>
            <Text style={styles.textItemInside}>Tableau de bord</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.containerItem} onPress={this.navigateToScreen('Campagne')}>
            <Icon name="bar-chart" style={styles.iconItemLeft}/>
            <Text style={styles.textItemInside}>Statistiques de campagne</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.containerItem} onPress={this.navigateToScreen('Appel')}>
            <Icon name="phone" style={styles.iconItemLeft}/>
            <Text style={styles.textItemInside}>Liste des appels</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.containerItem} onPress={this.navigateToScreen('Message')}>
            <Icon name="envelope" style={styles.iconItemLeft}/>
            <Text style={styles.textItemInside}>Liste des messages</Text>
          </TouchableOpacity>

          {this.state.user && this.state.user.type === '1' && (
              
            <TouchableOpacity style={styles.containerItem} onPress={this.navigateToScreen('User')}>
              <Icon name="users" style={styles.iconItemLeft}/>
              <Text style={styles.textItemInside}>Gestion des utilisateurs</Text>
            </TouchableOpacity>)

          }

          <TouchableOpacity style={styles.containerItem} onPress={this.navigateToScreen('Demandes')}>
            <Icon name="ticket" style={styles.iconItemLeft}/>
            <Text style={styles.textItemInside}>Gestion des demandes</Text>
          </TouchableOpacity>

          <View style={styles.containerItemDevider}/>

          <TouchableOpacity style={styles.containerItem} onPress={() => this.props.logout()}>
            <Icon name="power-off" style={styles.iconItemLeft}/>
            <Text style={styles.textItemInside}>Deconnexion</Text>
          </TouchableOpacity>
        </ScrollView>
          <View style={styles.headercontainertwo}>
            <Text style={styles.headertextwhite}>Espace client :</Text>
            <Text style={styles.headertextorange}>02 22 06 99 03</Text>
          </View>
          <View style={styles.menutextcopyright}>
          <Text style={styles.menutextcopyright}>© 2018. Tous droits réservés. Créé par Visiorank</Text>
          </View>
        </View>
    );
  }
}

DrawerContent.propTypes = {
  navigation: PropTypes.object
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

const mapStateToProps = state => ({
  token: state.login.item.mobile_token
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)