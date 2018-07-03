import React, { Component } from 'react';
import { NavigationActions, DrawerActions } from 'react-navigation';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import styles from './Sidebar.style';
import PropTypes from 'prop-types';
import imagestat from '../../../assets/images/menu_stat.png';
import imagecall from '../../../assets/images/menu_call.png';
import imagemessage from '../../../assets/images/menu_message.png';

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
            
            <TouchableOpacity style={styles.containerItem} onPress={this.navigateToScreen('Home')}>
                    
                <AutoHeightImage
                    style={styles.iconItemLeft}
                    source={imagestat}
                    width={19}
                />

                <Text style={styles.textItemInside}>Statistiques de campagne</Text>
                    
            </TouchableOpacity>

            <TouchableOpacity style={styles.containerItem} onPress={this.navigateToScreen('User')}>
                    
                <AutoHeightImage
                    style={styles.iconItemLeft}
                    source={imagecall}
                    width={16}
                />

                <Text style={styles.textItemInside}>Liste des appels</Text>
                    
            </TouchableOpacity>

            <TouchableOpacity style={styles.containerItem}>
                    
                <AutoHeightImage
                    style={styles.iconItemLeft}
                    source={imagemessage}
                    width={18}
                />

                <Text style={styles.textItemInside}>Liste des messages</Text>
                    
            </TouchableOpacity>

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
<View style={styles.navSectionStyle}>
                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Home')}>
                    Tableau de bord
                </Text>
                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('User')}>
                    Utilisateurs
                </Text>
            </View>
*/