import React, { Component } from 'react'
import { Text, View } from 'react-native';
import styles from './message.style';
import { fetchMessages } from '../../../store/actions/message.action';
import { connect } from "react-redux";
import Loader from '../../loader/Loader';
import { Messages }  from './message.component'; 

class MessagesListContainer extends Component{

    componentDidMount() {
        const { token } = this.props
        alert(token)
        this.props.dispatch(fetchMessages(token));
    }

    render() {
        const { error, loading, messages } = this.props;
        if (loading) {
            return <Loader loading={ loading }/>
        }

        if (error) {
            return (
                <View style={styles.container}>
                    <Text style={styles.errortext}>Error calling ws! {error.message}</Text>
                </View>
            );
        }

        return (
            <View >
                <Messages messages={ messages }/>  
            </View>   
        );
    }
}

const mapStateToProps = state => ({
    messages: state.messages.items,
    loading: state.messages.loading,
    error: state.messages.error,
    token: state.login.item.mobile_token
});

export default connect(mapStateToProps)(MessagesListContainer);

