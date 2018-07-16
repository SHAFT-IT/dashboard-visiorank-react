import React from 'react'
import { connect } from 'react-redux'
import { ListView } from 'react-native'
import { fetchDemandes } from '../../store/actions/demandes.actions'
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
    const { token } = this.props
    this.props.dispatch(fetchDemandes(token));
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

const mapStateToProps = (state) => {
  return {
    items: state.demandes.items || [],
    loading: state.demandes.loading,
    token: state.login.item.mobile_token,
  }
}

export default connect(mapStateToProps)(Demandes)
