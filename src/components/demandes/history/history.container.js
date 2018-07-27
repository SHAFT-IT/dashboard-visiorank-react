import React, { Component } from 'react'
import {View, Text, FlatList, StyleSheet} from 'react-native'
import styles from './history.style';

export default class HistoryContainer extends Component{

    constructor(props)
    {
      super(props);
      this.state = { 
        historyItems: [{date: "18-07-18"}, {date: "19-07-18"}, {date: "20-07-18"}, {date: "21-07-18"}, {date: "22-07-18"}],
      }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <FlatList
                    data={ this.state.historyItems }
                    renderItem={({item}) =>
                    <View style={{flex: 1, height: 100}}>
                        <View style={styles.gridViewBlockStyle}>
                            <Text style={styles.gridViewInsideTextItemStyle}> {item.date} </Text>
                        </View>
                    </View>
                    }
                />
            </View>
        );
    }
}

