import React from 'react'
import { connect } from 'react-redux'
import { ListView } from 'react-native'
import { fetchDemandes } from '../../store/demandes/demandes.actions'
import Loader from '../loader/Loader'
import DemandeItem from './demande.item.component'

class Demandes extends React.Component {

  constructor(props) {
    super(props)
    let { items } = props
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds.cloneWithRows(items),
      items
    }
  }

  componentWillReceiveProps ({ items }) {
    if (items !== this.props.items) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items),
        items
      })
    }
  }

  /**
   * Fetch items when component is mounted
   */
  componentDidMount() {
    this.props.fetchDemandes()
  }

  /**
   * Render component
   * @returns {*}
   */
  render() {
    const { loading } = this.props

    alert(this.state.items.length)

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
    fetchDemandes: function () {
      dispatch(fetchDemandes())
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
