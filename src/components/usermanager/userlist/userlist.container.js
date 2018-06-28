import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native';
import styles from './userlist.style';
//import { Dashboard } from './dashboard.component';


export default class UserListContainer extends Component{

    render() {
        return (
        
            <View style={styles.container}>
                <FlatList
                    data={[
                        {key: 'Devin'},
                        {key: 'Jackson'},
                        {key: 'James'},
                        {key: 'Joel'},
                        {key: 'John'},
                        {key: 'Jillian'},
                        {key: 'Jimmy'},
                        {key: 'Julie'},
                    ]}
                    renderItem = 
                    {({item}) => 

                        <View style={styles.item}>
                            <Text style={styles.itemtext}>{item.key}</Text>
                        </View>

                    }
                />
            </View>
                
        );
    }

}