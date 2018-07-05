import React from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { fetchDemandes } from "../../store/demandes/demandes.actions"
import Loader from "../loader/Loader";

class Demandes extends React.Component {

  /**
   * Fetch items when component is mounted
   */
  componentDidMount() {
    this.props.fetchDemandes('')
  }

  /**
   * Render component
   * @returns {*}
   */
  render() {
    const { items, loading } = this.props

    if (loading) {
      return <Loader loading={true}/>
    }

    return (
      <View>
        {items && items.map((item, key) => <Text key={key}>{JSON.stringify(item)}</Text>)}
      </View>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDemandes: function (token) {
      dispatch(fetchDemandes(token))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.demandes.items || [],
    loading: state.demandes.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Demandes)
