import React from 'react'
import { Text, View, TouchableOpacity, TouchableHighlight } from 'react-native'
import Accordion from 'react-native-collapsible/Accordion';
import styles from './demande.style';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

class DemandeItem extends React.Component {
  state = {
    expanded: false
  }

  toggle = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  _renderSectionTitle(item) {
    return (
      <View style={styles.content}>
        <Text>{item.titre}</Text>
      </View>
    );
  }

  _renderHeader(item) {
    return (
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText} numberOfLines={2}>Demande #{item.ticket_id} - {item.titre}</Text>
        </View>
        <View style={styles.buttonHeader}>
          <TouchableHighlight style={styles.bsubmit1}>
            <Text style={styles.buttonText}>{item.status}</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.bsubmit2}>
            <Text style={styles.buttonText}>{item.type}</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.bsubmit3}>
            <Text style={styles.buttonText}>{item.priority}</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  _renderContent(item) {
    const dateCreation = moment(item.date_creation).format('Do MMM YY')
    const dateModification = moment(item.date_modification).format('Do MMM YY')

    return (
      <View style={styles.content}>
        <Text style={styles.contentList}>Date de création : {dateCreation}</Text>
        <Text style={styles.contentList}>Date de dernière modification : {dateModification}</Text>
        <Text style={styles.contentList}>Propriétaire : {item.prenom} {item.nom}</Text>
      </View>
    );
  }

  render() {
    const { item } = this.props
    return (
      <View>
        <View>
          <Accordion
            activeSection={this.state.activeSection}
            sections={[item]}
            touchableComponent={TouchableOpacity}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            duration={400}
          />
        </View>
        <View style={styles.buttonContentHeader}>
          <TouchableOpacity style={styles.buttonContent1}>
            <Text><Icon name="edit" style={styles.iconItemLeft}/></Text>
          </TouchableOpacity>        
          <TouchableOpacity style={styles.buttonContent2}>
            <Text><Icon name="trash" style={styles.iconItemLeft}/></Text>
          </TouchableOpacity>        
          </View>
        <View style={styles.containerItemDevider}/>
        </View>
    )
  }
}

export default DemandeItem
