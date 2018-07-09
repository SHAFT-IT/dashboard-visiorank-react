import React from 'react'
import { Text, View, ListView, TouchableHighlight } from 'react-native';
import styles from './message.style';
import moment from 'moment';
import 'moment/locale/fr'
moment.locale('fr');
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/FontAwesome';
import { bgColor } from '../../../commons/colors';


export class Messages extends React.Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(props.messages),
        };
    }

    render() {
        return (
        <ListView 
            dataSource={this.state.dataSource} 
            renderRow = {
                ( item ) => (
                    <MessageItem item={item}/>
                )
            } />
        );
    }
}

const MessageItem = ({item}) => {
    const date = moment.unix(item.udate).format('Do MMM YY')
    const lettre = item.from.charAt(0).toUpperCase()
    let backgroundColor = bgColor(lettre)
    
    let swipeBtns = [
        {
            text: <Icon name="eye" style={styles.iconleft}/>,
            backgroundColor: '#f5f5f5',
            underlayColor: '#ffffff',
            onPress: () => { }
        },
        {
            text: <Icon name="trash" style={styles.iconleft}/>,
            backgroundColor: '#f9f9f9',
            underlayColor: '#ffffff',
            onPress: () => { }
        }
    ];

    return (
        <Swipeout right={swipeBtns} autoClose='true' backgroundColor= 'transparent'>
            <TouchableHighlight underlayColor='#ffffff'>
                    <View style={styles.item}>
                        <View style={{width: 50}}>
                            <Text style={{  width: 40, height: 40, borderRadius: 40 / 2, color:"#fbecc9", backgroundColor: backgroundColor, textAlign:'center', fontSize: 30/*, fontWeight:'bold'*/}}>{lettre}</Text>
                        </View>    
                        <View style={{width: 270, marginLeft:5}}>
                            <Text style={ styles.itemtextdate }>{date}</Text> 
                            <Text style={ styles.itemtext } numberOfLines={1}>{item.from}</Text> 
                            <Text style={ item.seen ? styles.itemtextseen : styles.itemtextunseen } numberOfLines={1}>{item.subject}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
        </Swipeout>
    )
}