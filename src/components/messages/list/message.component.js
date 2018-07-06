import React from 'react'
import { Text, View, ListView, TouchableHighlight } from 'react-native';
import styles from './message.style';
import moment from 'moment';
import 'moment/locale/fr'
moment.locale('fr');
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/FontAwesome';


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
    const date = moment.unix(item.udate).format('Do MMMM YYYY hh:mm')

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
                    <Text style={ styles.itemtext }>{date}</Text> 
                    <Text style={ styles.itemtext }>{item.from}</Text> 
                    <Text style={ item.seen ? styles.itemtext : styles.itemtextunseen }> { item.subject } </Text>
                </View>
            </TouchableHighlight>
        </Swipeout>
    )
}