import React from 'react'
import { Text, View, WebView, Dimensions  } from 'react-native';
import { detailMessage } from '../../../store/actions/message.action';
import Loader from '../../loader/Loader';
import {connect} from 'react-redux'
import { INJECTED_JAVASCRIPT } from '../../../commons/constant';

class DetailMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        props.dispatch(detailMessage(this.props.navigation.state.params.currentMessage.uid))
    }

    render() {
        let { currentItem, loading } = this.props

        if (loading) {
            return <Loader loading={true} />
        }

        let header = currentItem.header || {}
        return (
            <View style={{flex:1, width: Dimensions.get('window').width, padding : 10}}>
                <Text style={ styles.text }>De : {header.fromaddress}</Text>
                <Text style={ styles.text }>Pour : {header.toaddress}</Text>
                <Text style={ styles.text }>Sujet : {header.subject}</Text>
                <Text style={ styles.text }>Message : </Text>
                <WebView 
                    source={{html: currentItem.body}} 
                    injectedJavaScript={INJECTED_JAVASCRIPT}
                    scalesPageToFit={false}
                />
            </View>
        );
    }
}

const styles = {
    text: {
        marginHorizontal : 10,
        marginVertical : 10        
     }
}

const mapStateToProps = state => ({
    loading: state.messages.loading,
    currentItem: state.messages.currentItem || {},
})

export default connect(mapStateToProps)(DetailMessage)
