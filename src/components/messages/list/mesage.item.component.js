import React from 'react'
import { Text, View, TouchableHighlight } from 'react-native';
import styles from './message.style';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/FontAwesome';
import { bgColor } from '../../../commons/colors';
import moment from 'moment';
import 'moment/locale/fr'
moment.locale('fr');

const MessageItem = ({ item, showDetails }) => {
    const date = moment.unix(item.udate).format('Do MMM YY')
    const lettre = item.from.charAt(0).toUpperCase()
    let backgroundColor = bgColor(lettre)

    let swipeBtns = [
        {
            text: <Icon name="eye" style={styles.iconleft}/>,
            backgroundColor: '#f5f5f5',
            underlayColor: '#ffffff',
            onPress: () => showDetails(item, true)
        },
        {
            text: <Icon name="trash" style={styles.iconleft}/>,
            backgroundColor: '#f9f9f9',
            underlayColor: '#ffffff',
            onPress: () => { }
        }
    ];

    return (
        <Swipeout right={swipeBtns} autoClose='true' backgroundColor= 'transparent' sensitivity={1}>
            <TouchableHighlight underlayColor='#ffffff' onPress={() => showDetails(item, true)}>
                <View style={styles.item}>
                    <View style={{height:40, width: 40}}>
                        <Text style={[style.text, { backgroundColor: backgroundColor}]}>{lettre}</Text>
                    </View>    
                    <View style={{width: 300, marginLeft:5}}>
                        <Text style={ styles.itemtextdate }>{date}</Text> 
                        <Text style={ styles.itemtext } numberOfLines={1}>{item.from}</Text> 
                        <Text style={ item.seen ? styles.itemtextseen : styles.itemtextunseen } numberOfLines={1}>{item.subject}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        </Swipeout>
    )
}

const style = {
    text: {
        flex:1,
        borderRadius: 40 / 2,
        color:"#fbecc9",
        textAlign:'center',
        fontSize: 28
    }
}

export default MessageItem