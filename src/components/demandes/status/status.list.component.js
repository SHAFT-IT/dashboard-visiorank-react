import React, { Component } from 'react';
import { ListView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchStatus } from '../../../store/actions/status.action';
import Loader from '../../loader/Loader';
import StatusItem from './status.item.component';

class StatusList extends Component {

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.items),
      activeIndex: parseInt(props.currentDemande.statut_id, 10)
    };
  }

  getItems = (items) => {
    const { activeIndex } = this.state;

    // STATUT_BROUILLON_KEY
    if (activeIndex === 1) {
      return items.filter(item => parseInt(item.statut_id, 10) > 1);
    }

    // STATUT_PRISE_EN_CHARGE_KEY
    if (activeIndex === 2) {
      return items.filter(item => [1, 4, 6].includes(parseInt(item.statut_id, 10)));
    }

    // STATUT_REFUSE_KEY
    if (activeIndex === 3) {
      return items.filter(item => [1, 6].includes(parseInt(item.statut_id, 10)));
    }

    // STATUT_LIVRE_KEY
    if (activeIndex === 4) {
      return items.filter(item => [1, 5, 3, 6].includes(parseInt(item.statut_id, 10)));
    }

    // STATUT_VALIDE_KEY
    if (activeIndex === 5) {
      return items.filter(item => [1, 6].includes(parseInt(item.statut_id, 10)));
    }

    // STATUT_CLOS_KEY
    if (activeIndex === 6) {
      return items.filter(item => parseInt(item.statut_id, 10) === 1);
    }

    return items;
  };

  componentWillReceiveProps({ items }) {
    if (items !== this.props.items) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.getItems(items)),
        items
      });
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchStatus());
  }

  render() {
    const { loading, currentDemande } = this.props;

    if (loading) {
      return <Loader loading={true}/>;
    }

    const current = this.props.items.find(i => i.statut_id === currentDemande.statut_id) || {};

    return (

      <View style={{ width: 300, height: 'auto', borderRadius: 5, paddingVertical: 5, backgroundColor: '#fff' }}>
        <View>
          <Text style={{ fontWeight: 'bold', textAlign: 'center', margin: 20 }}>Modification du statut de la
            demande</Text>
          <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Statut actuel : {current.statut_libelle}</Text>
          <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Nouveau statut :</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={item => <StatusItem item={item} showModal={this.props.showModal}/>}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.status.loading,
  items: state.status.items,
  currentDemande: state.demandes.current
});

export default connect(mapStateToProps)(StatusList);
