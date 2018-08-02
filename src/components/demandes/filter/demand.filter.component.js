import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    BackHandler,
    Text,
    TextInput,
    TouchableOpacity,
    DatePickerAndroid,
    Dimensions
} from 'react-native';
import {connect} from 'react-redux'
import {fetchCriteria, onDemandsFiltered} from "../../../store/actions/demands.filter.action";
import Loader from "../../loader/Loader";
import {Dropdown} from 'react-native-material-dropdown';
import moment from 'moment'

class FilterComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            selectedPriority: -1,
            selectedStatus: -1,
            selectedDateBegin: '',
            selectedDateEnd: '',
        };
    }

    componentDidMount() {
        this.props.dispatch(fetchCriteria())
    }

    onFilterDemands = () => {
        const {demands} = this.props
        const filteredByTitle = this._filterByTitle(demands)
        const filteredByPriority = this._filterByPriority(filteredByTitle)
        const filteredByStatus = this._filterByStatus(filteredByPriority)
        const filteredByBeginDate = this._filterByDateBegin(filteredByStatus)
        const filteredDemands = this._filterByDateEnd(filteredByBeginDate)
        const {showFilter} = this.props
        showFilter(false, {demands: filteredDemands})
       // this.props.dispatch(onDemandsFiltered(filteredByEndDate))
        
    }

    onOpenBeginDatePicker = () => {
        this._openBeginDatePicker().then({})
    }

    onOpenEndDatePicker = () => {
        this._openEndDatePicker().then({})
    }

    _filterByTitle = (demands) => {
        const {title} = this.state
        const regex = new RegExp(`${title.trim()}`, 'i');
        if (title === '') {
            return demands
        } else {
            return demands.filter(demand => demand.titre.search(regex) >= 0)
        }
    }

    _filterByPriority = (demands) => {
        const {selectedPriority} = this.state
        return selectedPriority === -1 ? demands : demands.filter(demand => demand.priorite_id === selectedPriority)
    }

    _filterByDateBegin = (demands) => {
        const {selectedDateBegin} = this.state
        return selectedDateBegin === '' ? demands :
            demands.filter(demand => moment(demand.date_creation).format('DD/MM/YYYY') > selectedDateBegin)
    }

    _filterByDateEnd = (demands) => {
        const {selectedDateEnd} = this.state
        return selectedDateEnd === '' ? demands :
            demands.filter(demand => moment(demand.date_creation).format('DD/MM/YYYY') < selectedDateEnd)
    }

    async _openBeginDatePicker() {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({selectedDateBegin: moment(new Date(year, month, day)).format('DD/MM/YYYY')})
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }

    async _openEndDatePicker() {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({selectedDateEnd: moment(new Date(year, month, day)).format('DD/MM/YYYY')})
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }

    _filterByStatus = (demands) => {
        const {selectedStatus} = this.state
        return selectedStatus === -1 ? demands : demands.filter(demand => demand.statut_id === selectedStatus)
    }

    _filterByType = (demands) => {
        const {selectedStatus} = this.state
        return demands.filter(demand => demand.type_id === selectedStatus)
    }

    onChangeTextPriority = (value) => {
        this.setState({selectedPriority: value})
    }

    onChangeTextStatus = (value) => {
        this.setState({selectedStatus: value})
    }

    render() {
        const {loadingOnFetchingCriteria, criteria} = this.props
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
                        <Dropdown
                            label='Priorité de la demande'
                            containerStyle={styles.drpStyle}
                            data={criteria ? criteria.priorities.map(p => ({
                                value: p.priorite_id,
                                label: p.priorite_libelle
                            })) : []}
                            onChangeText={this.onChangeTextPriority}
                        />
                        <Dropdown
                            containerStyle={styles.drpStyle}
                            label='Statut de la demande'
                            data={criteria ? criteria.status.map(s => ({
                                value: s.statut_id,
                                label: s.statut_libelle
                            })) : []}
                            onChangeText={this.onChangeTextStatus}
                        />
                        <TouchableOpacity onPress={this.onOpenBeginDatePicker}>
                            <TextInput style={styles.textArea}
                                       editable={false}
                                       placeholder="Date de début"
                                       underlineColorAndroid='transparent'
                                       value={this.state.selectedDateBegin}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onOpenEndDatePicker}>
                            <TextInput style={styles.textArea}
                                       editable={false}
                                       placeholder="Date de fin"
                                       underlineColorAndroid='transparent'
                                       value={this.state.selectedDateEnd}
                            />
                        </TouchableOpacity>
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
        width: 300,
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
        marginRight: 20,
        marginLeft: 20,
        marginTop: 5,
        marginBottom: 5,
        fontSize: 10,
        height: 35,
        borderRadius: 6,
        borderWidth: 1,
        paddingLeft: 15,
        borderColor: '#939393',
    },
    drpStyle: {
        marginRight: 20,
        marginLeft: 20,
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


