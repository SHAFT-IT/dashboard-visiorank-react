import React, { Component } from 'react'
import { Text, View } from 'react-native';
import styles from './appel.style';
import { fetchAppels } from '../../store/actions/appel.action';
import { connect } from "react-redux";
import Loader from '../loader/Loader';
import Appels from './appel.component'; 

class AppelsListContainer extends Component{

    componentDidMount() {
        const { token } = this.props
        this.props.dispatch(fetchAppels(token));
    }

    render() {
        const { error, loading, appels } = this.props;
        if (loading) {
            return <Loader loading={ loading }/>
        }

        if (error) {
            return (
                <View style={styles.container}>
                    <Text style={styles.errortext}>Error calling ws! {JSON.stringify(error)}</Text>
                </View>
            );
        }
        if (!appels || appels.length<1) {
            return (
                <View style={styles.container}>
                    <Text style={styles.errortext}>Liste vide</Text>
                </View>
            );
        }
        return (
                <Appels appels={ appels }/>  
        );
    }
}

const mapStateToProps = state => ({
    appels: state.appels.items,
    loading: state.appels.loading,
    error: state.appels.error,
    token: state.login.item.mobile_token
});

export default connect(mapStateToProps)(AppelsListContainer);

