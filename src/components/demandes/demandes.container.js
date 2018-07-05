import React from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { fetchDemandes } from "../../store/demandes/demandes.actions";

class Demandes extends React.Component {

  componentDidMount() {
    this.props.fetchDemandes('')
  }

  render() {
    const { items } = this.props
    return (
      <View>
        {items.map((item, key) => <Text key={key}>{JSON.stringify(item)}</Text>)}
      </View>
    );
  }

}

const mapDispatchToProps = function (dispatch) {
  return {
    fetchDemandes: function (token) {
      dispatch(fetchDemandes(token))
    }
  }
}

const mapStateToProps = function (state) {
  return {
    items: state.demandes.items || [],
    loading: state.demandes.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Demandes)
