import React, {Component} from 'react'
import {View, StyleSheet, BackHandler, Text, TextInput,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux'
import {fetchCriteria} from "../../../store/actions/demands.filter.action";
import Loader from "../../loader/Loader";

class FilterComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            filteredDemands: []
        };
    }

    componentDidMount() {
        this.props.dispatch(fetchCriteria())
    }

    onFilterDemands = () => {
        const d = this._filterByTitle()
    }

    _filterByTitle = () => {
        const {title} = this.state
        const {demands} = this.props
        const regex = new RegExp(`${title.trim()}`, 'i');
        if (title === '') {
            return demands
        } else {
            return demands.filter(demand => demand.titre.search(regex) >= 0)
        }
    }

    render() {
        const {loadingOnFetchingCriteria} = this.props
        if (loadingOnFetchingCriteria) {
            return (<Loader loading={loadingOnFetchingCriteria}/>)
        } else {
            return (
                <View style={styles.container}>
                    <View>
                        <Text style={styles.title}>Rechercher une demande</Text>
                        <TextInput style={styles.textArea}
                                   placeholder="Titre de la demande"
                                   underlineColorAndroid='transparent'
                                   value={this.state.title}
                                   onChangeText={value => {
                                       this.setState({title: value})
                                   }}
                        />
                        <TouchableOpacity
                            style={styles.buttonFilter}
                            onPress={this.onFilterDemands}>
                            <Text style={styles.buttonTextSearch}>Rechercher</Text>

                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }
}

const mapStateToProps = state => ({
    criteria: state.criteria.responseOnFetchingCriteria,
    loadingOnFetchingCriteria: state.criteria.loadingOnFetchingCriteria,
    errorOnFetchingCriteria: state.criteria.errorOnFetchingCriteria
})

export default connect(mapStateToProps)(FilterComponent)

const styles = StyleSheet.create({
    container: {
        height: 'auto',
        borderRadius: 5,
        backgroundColor: '#fff'
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20
    },
    textArea: {
        margin: 20,
        fontSize: 10,
        height: 50,
        borderRadius: 6,
        borderWidth: 1,
        paddingLeft: 15,
        borderColor: '#939393',
    },
    buttonFilter: {
        margin: 20,
        height: 50,
        borderRadius: 6,
        backgroundColor: 'green',
        alignItems: "center",
        justifyContent: "center",
    },
    buttonTextSearch: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})


