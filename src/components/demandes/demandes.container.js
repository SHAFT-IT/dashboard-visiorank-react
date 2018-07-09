import React from 'react'
import { connect } from 'react-redux'
import { ListView } from 'react-native'
import { fetchDemandes } from '../../store/demandes/demandes.actions'
import Loader from '../loader/Loader'
import DemandeItem from './demande.item.component'

class Demandes extends React.Component {

  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds.cloneWithRows(this.props.items),
      items: props.items
    }
  }

  componentWillReceiveProps ({ items }) {
    if (items !== this.props.items) {
      this.setState({
        items,
        dataSource: this.state.dataSource.cloneWithRows(items)
      })
    }
  }

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
    const { loading } = this.props

    if (loading) {
      return <Loader loading={true}/>
    }

    return (
      <ListView enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={item => <DemandeItem item={item}/>}/>
    )
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
