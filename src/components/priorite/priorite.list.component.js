import React, { Component } from 'react'
import { ListView } from 'react-native'
import { connect } from 'react-redux'
import { fetchPriorite } from '../../store/actions/priorite.action';
import Loader from '../loader/Loader';
import PrioriteItem from './priorite.item.component'

class PrioriteList extends Component {

    constructor (props) {
        super(props)
        const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.items),
            activeIndex: 1
        };
    }

    componentWillReceiveProps ({ items }) {
        if (items !== this.props.items) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items),
                items
            })
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchPriorite())
    }

    render() {
        const { loading } = this.props

        if (loading) {
            return <Loader loading={true} />
        }

        return (
            <ListView
              dataSource={this.state.dataSource}
              renderRow={item => <PrioriteItem item={item}/>}
            />
        )
    }
}

const mapStateToProps = state => ({
    loading: state.priorite.loading,
    items: state.priorite.items
})

export default connect(mapStateToProps)(PrioriteList)
