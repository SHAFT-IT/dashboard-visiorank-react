import React, { Component } from 'react';
import { ListView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchPriorite } from '../../../store/actions/priorite.action';
import Loader from '../../loader/Loader';
import PrioriteItem from './priorite.item.component';

class PrioriteList extends Component {

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.items),
      activeIndex: parseInt(props.currentDemande.priorite_id, 10)
    };
  }

  getItems = (items) => {
    const { activeIndex } = this.state;

    // Haute
    if (activeIndex === 1)
      return items.filter(item => [2, 3].includes(parseInt(item.priorite_id, 10)));

    // Normal
    if (activeIndex === 2)
      return items.filter(item => [1, 3].includes(parseInt(item.priorite_id, 10)));

    // Basse
    if (activeIndex === 3)
      return items.filter(item => [1, 2].includes(parseInt(item.priorite_id, 10)));

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
    this.props.dispatch(fetchPriorite());
  }

  render() {
    const { loading, currentDemande } = this.props;


    if (loading) {
      return <Loader loading={true}/>;
    }
    const current = this.props.items.find(i => i.priorite_id === currentDemande.priorite_id) || {};

    return (
      <View style={{ width: 300, height: 'auto', borderRadius: 5, paddingVertical: 5, backgroundColor: '#fff' }}>
        <View>
          <Text style={{ fontWeight: 'bold', textAlign: 'center', margin: 20 }}>Modification de la priorité de la
            demande</Text>
          <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Priorité actuelle
            : {current.priorite_libelle}</Text>
          <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Nouvelle priorité :</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={item => <PrioriteItem item={item} showModal={this.props.showModal}/>}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.priorite.loading,
  items: state.priorite.items,
  currentDemande: state.demandes.current
});

export default connect(mapStateToProps)(PrioriteList);
