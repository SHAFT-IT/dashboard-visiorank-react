import React, {Component} from 'react';
import {NavigationActions, DrawerActions} from 'react-navigation';
import {ScrollView, Text, View, TouchableOpacity} from 'react-native';
import styles from './Sidebar.style';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {logout} from '../../../store/actions/logout.action';
import {connect} from 'react-redux';
import {getData} from '../../../commons/preferences';
import AutoHeightImage from 'react-native-auto-height-image';
import imageLogo from '../../../assets/images/logo_login.png' ;
import Loader from '../../loader/Loader';

class DrawerContent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {},
            activeIndex: 1
        }
    }

    componentWillReceiveProps({selectedMenuIndex, logoutSuccess}) {
        if (this.state.activeIndex !== selectedMenuIndex) {
            this.setState({activeIndex: selectedMenuIndex})
        }

        if (logoutSuccess && logoutSuccess !== this.props.logoutSuccess) {
            this.logoutRedirect();
        }
    }

    componentDidMount() {
        getData('user')
            .then(user => {
                this.setState({user: user});
            })
            .catch(error => console.log("error"))
    }

    logoutRedirect = () => {

        this.props.navigation.navigate('Authentification');

    }

    getBackgroundColor = (active) => {
        return active === this.state.activeIndex ? this.props.activeBackgroundColor : this.props.inactiveBackgroundColor;
    }

    navigateToScreen = (route, activeIndex) => () => {
        this.setState({activeIndex: activeIndex})
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
        this.props.navigation.dispatch(DrawerActions.closeDrawer());

    }

    render() {
        const { loadingLogout } = this.props;

        return (
            <View style={styles.container}>

                { 
                    loadingLogout && (
                        <Loader loading={loadingLogout} />
                    )
                }

                <ScrollView>
                    <TouchableOpacity style={[styles.containerItem, {backgroundColor: this.getBackgroundColor(1)}]}
                                      onPress={this.navigateToScreen('Home', 1)}>
                        <Icon name="dashboard" style={styles.iconItemLeft}/>
                        <Text style={styles.textItemInside}>Tableau de bord</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.containerItem, {backgroundColor: this.getBackgroundColor(2)}]}
                                      onPress={this.navigateToScreen('Campagne', 2)}>
                        <Icon name="bar-chart" style={styles.iconItemLeft}/>
                        <Text style={styles.textItemInside}>Statistiques de campagne</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.containerItem, {backgroundColor: this.getBackgroundColor(3)}]}
                                      onPress={this.navigateToScreen('Appel', 3)}>
                        <Icon name="phone" style={styles.iconItemLeft}/>
                        <Text style={styles.textItemInside}>Liste des appels</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.containerItem, {backgroundColor: this.getBackgroundColor(4)}]}
                                      onPress={this.navigateToScreen('Message', 4)}>
                        <Icon name="envelope" style={styles.iconItemLeft}/>
                        <Text style={styles.textItemInside}>Liste des messages</Text>
                    </TouchableOpacity>
                    {this.state.user && this.state.user.type === '1' && (
                        <TouchableOpacity style={[styles.containerItem, {backgroundColor: this.getBackgroundColor(5)}]}
                                          onPress={this.navigateToScreen('User', 5)}>
                            <Icon name="users" style={styles.iconItemLeft}/>
                            <Text style={styles.textItemInside}>Gestion des utilisateurs</Text>
                        </TouchableOpacity>)
                    }
                    <TouchableOpacity style={[styles.containerItem, {backgroundColor: this.getBackgroundColor(6)}]}
                                      onPress={this.navigateToScreen('Demandes', 6)}>
                        <Icon name="ticket" style={styles.iconItemLeft}/>
                        <Text style={styles.textItemInside}>Gestion des demandes</Text>
                    </TouchableOpacity>
                    <View style={styles.containerItemDevider}/>
                    <TouchableOpacity style={styles.containerItem} onPress={() => this.props.logout()}>
                        <Icon name="power-off" style={styles.iconItemLeft}/>
                        <Text style={styles.textItemInside}>Deconnexion</Text>
                    </TouchableOpacity>
                </ScrollView>
                <View style={{alignItems:"center"}}>
                    <View>
                        <AutoHeightImage source={imageLogo} width={200} />
                    </View>
                    <View style={styles.headercontainertwo}>
                        <Text style={styles.headertextgrey}>Espace client :</Text>
                        <Text style={styles.headertextorange}>02 22 06 99 03</Text>
                    </View>
                    <View style={styles.menutextcopyright}>
                        <Text style={styles.menutextcopyright}>© 2018. Tous droits réservés. Créé par Visiorank</Text>
                    </View>
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
    token: state.login.item.mobile_token,
    selectedMenuIndex: state.menu.selectedMenuIndex,
    loadingLogout: state.logout.loading,
    logoutSuccess: state.logout.logoutSuccess
}) 

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)