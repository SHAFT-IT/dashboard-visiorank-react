import React from 'react'
import { Text, View, ListView } from 'react-native';
import { CheckBox } from 'react-native-elements'
import styles from './appel.style';
import moment from 'moment';
import 'moment/locale/fr'
moment.locale('fr');

export default class Appels extends React.Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(props.appels),
        };
    }

    render() {
        return (
        <ListView 
            dataSource={this.state.dataSource} 
            renderRow = {
                ( item ) => (
                    <AppelItem item={item}/>
                )
            } />
        );
    }
}

const AppelItem = ({item}) => {
    const datestart = moment(item.starttime).format('DD/MM/YYYY hh:mm')
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <Text style={ styles.itemtext }>{datestart}</Text> 
                <Text style={ styles.itemtext }>{item.duration}</Text> 
                <Text style={styles.itemtext }>{ item.source }</Text> 
            </View>
            <CheckBox center title='Pertinent' checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checked={item.pertinant} />
        </View>
    )
}