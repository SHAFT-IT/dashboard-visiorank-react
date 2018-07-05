import React from 'react'
import { Text, View, ListView } from 'react-native';
import styles from './message.style';
import moment from 'moment';
import 'moment/locale/fr'
moment.locale('fr');

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
            renderRow = { ( item ) => (
                <MessageItem item={item}/>
            )}
        />
      );
    }
}

const MessageItem = ({item}) => {
    const date = moment.unix(item.udate).format('Do MMMM YYYY hh:mm')
    return (
        <View style={styles.item}>
            <Text style={ styles.itemtext }>{date}</Text> 
            <Text style={ item.seen ? styles.itemtext : styles.itemtextunseen } >
                { item.subject }
            </Text>
        </View>
    )
}