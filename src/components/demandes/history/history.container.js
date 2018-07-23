import React, { Component } from 'react'
import {View, Text, FlatList, StyleSheet} from 'react-native'

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

            <View style={styles.MainContainer}>
 
                <FlatList
                
                    data={ this.state.historyItems }
            
                    renderItem={({item}) =>
                    
                    <View style={{flex: 1, height: 100}}>
                        <View style={styles.GridViewBlockStyle}>
                            <Text style={styles.GridViewInsideTextItemStyle}> {item.date} </Text>
                        </View>
                        
                    </View>

                    }

                />
   
            </View>

        );

    }
  
}

const styles = StyleSheet.create({
 
    MainContainer :{
     
        flex:1,
        marginTop: 10
    },
    
    GridViewBlockStyle: {
      
        backgroundColor: '#DCDCDC',
        flexDirection: 'column',
        paddingVertical: 1,
        marginVertical: 1,
        height: 99
        
    },
     
    GridViewInsideTextItemStyle: {
     
        color: '#fff',
        padding: 10,
        fontSize: 13,
        justifyContent: 'center',
       
    },

     
});