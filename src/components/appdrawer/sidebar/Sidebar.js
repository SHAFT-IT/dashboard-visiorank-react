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
      activeIndex: 1
      //menus: [{name: "Home", select: true}, {name: "Campagne", select: false}, {name: "Appel", select: false}, {name: "Message", select: false}, {name: "User", select: false}, {name: "Demandes", select: false}]
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

  getBackgroundColor  = (active) => {
    return active === this.state.activeIndex ? this.props.activeBackgroundColor : this.props.inactiveBackgroundColor;
  }
 
  navigateToScreen = (route, activeIndex) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
    this.setState({activeIndex: activeIndex});
  }

  render() {
    //const { token, activeBackgroundColor, inactiveBackgroundColor } = this.props
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity style={[styles.containerItem, {backgroundColor: this.getBackgroundColor(1)}]} onPress={this.navigateToScreen('Home', 1)}>
            <Icon name="dashboard" style={styles.iconItemLeft}/>
            <Text style={styles.textItemInside}>Tableau de bord</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.containerItem, {backgroundColor:  this.getBackgroundColor(2)}]} onPress={this.navigateToScreen('Campagne', 2)}>
            <Icon name="bar-chart" style={styles.iconItemLeft}/>
            <Text style={styles.textItemInside}>Statistiques de campagne</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.containerItem, {backgroundColor:  this.getBackgroundColor(3)}]} onPress={this.navigateToScreen('Appel', 3)}>
            <Icon name="phone" style={styles.iconItemLeft}/>
            <Text style={styles.textItemInside}>Liste des appels</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.containerItem, {backgroundColor:  this.getBackgroundColor(4)}]} onPress={this.navigateToScreen('Message', 4)}>
            <Icon name="envelope" style={styles.iconItemLeft}/>
            <Text style={styles.textItemInside}>Liste des messages</Text>
          </TouchableOpacity>

          {this.state.user && this.state.user.type === '1' && (
              
            <TouchableOpacity style={[styles.containerItem, {backgroundColor:  this.getBackgroundColor(5)}]} onPress={this.navigateToScreen('User', 5)}>
              <Icon name="users" style={styles.iconItemLeft}/>
              <Text style={styles.textItemInside}>Gestion des utilisateurs</Text>
            </TouchableOpacity>)

          }

          <TouchableOpacity style={[styles.containerItem, {backgroundColor:  this.getBackgroundColor(6)}]} onPress={this.navigateToScreen('Demandes', 6)}>
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