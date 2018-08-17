import React from 'react';
import { ListView, Switch, Text, View } from 'react-native';
import styles from './appel.style';
import { connect } from 'react-redux';
import { setPertinance } from '../../store/actions/appel.action';
import moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');

class Appels extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = { dataSource: ds.cloneWithRows(props.appels) };
  }

  render() {
    const { currentItem } = this.props;
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={item => <AppelItem item={item} dispatch={this.props.dispatch} currentItem={currentItem}/>}
      />
    );
  }
}

class AppelItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchOnValueHolder: parseInt(props.item.pertinant) === 1
    };
  }

  savePertinance = (value, id) => {
    this.setState({
      switchOnValueHolder: value
    });
    this.props.dispatch(setPertinance(id));
  };

  render() {
    const { item } = this.props;
    const dStart = moment(item.starttime).format('Do MMM YY');
    const hStart = moment(item.starttime).format('hh:mm');

    return (
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemtextdate}>{dStart} à {hStart}</Text>
          <Text style={styles.itemtext}>{item.duration}</Text>
          <Text style={styles.itemtext}>{item.source}</Text>
        </View>
        <View style={styles.itemRight}>
          <Switch value={item.pertinant} onValueChange={(value) => this.savePertinance(value, item.id)}
                  style={{ marginBottom: 10 }} value={this.state.switchOnValueHolder}/>
        </View>
      </View>
    );
  }
}

export default connect()(Appels);
