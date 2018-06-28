import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View } from 'react-native';
import styles from './Sidebar.style';
import PropTypes from 'prop-types';


class DrawerContent extends Component {

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }

  render () {
    return (
      <View style={styles.container}>
          <ScrollView>
            <View style={styles.navSectionStyle}>
                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Home')}>
                    Tableau de bord
                </Text>
                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('User')}>
                    Utilisateurs
                </Text>
            </View>
          </ScrollView>
      </View>
    );
  }
}

DrawerContent.propTypes = {
  navigation: PropTypes.object
};

export default DrawerContent;

/*
<ScrollView>

          <Text style={styles.separatorTop}>
          </Text>

          <Button
            title='Tableau de bord'
            style={styles.button}
            onPress={this.navigateToScreen('TableauBord')}/>

            <Text style={styles.sectionHeadingStyle}>
            </Text>

          <Button
            title='Utilisateurs'
            style={styles.button}
            onPress={this.navigateToScreen('Utilisateur')}/>

            <Text style={styles.sectionHeadingStyle}>
           </Text>

          
        </ScrollView>*/