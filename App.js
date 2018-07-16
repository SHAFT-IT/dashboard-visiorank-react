/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import store from './src/store'
import { Provider } from 'react-redux'
import {View, Text, TouchableHighlight, StyleSheet } from 'react-native'

//components after login
import Splash from './src/components/splash/splash';

var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({name: 'visiorank.db', createFromLocation : "~visiorank.db"}, this.openCB, this.errorCB);
//var db = SQLite.openDatabase({name: 'visiorank.db', createFromLocation: '~visiorank.db'});
//var db = SQLite.openDatabase({name : "visiorank", createFromLocation : 1});

/*var db;
SQLite.openDatabase({name: 'visiorank.db', createFromLocation: '~visiorank.db'}).then((DB) => {
  db = DB;
  
}).catch((error) => {
  console.log(error);
});*/


export default class App extends Component {

  constructor(props){

    super(props);

    this.state = {
      prefuser : "",
    };

    /*db.transaction((tx) => {

        this.populateDB(tx);
    });*/
  }

  componentDidMount() {
    console.disableYellowBox = true;
  }

  render() {
    return (
      
      <Provider store={store()}>
        <Splash />
      </Provider>

      /*<View style={styles.container}>
        <Text>{'USER PREFERENCE IS ' + this.state.prefuser}
        </Text>

        <TouchableHighlight
            style={styles.highlight}
            onPress={()=>this.queryWithDelay()}>

            <Text>refresh</Text>

        </TouchableHighlight>
        
      </View>*/


    );
  }

  queryWithDelay = () => {
    //setTimeout(() =>{
  
      console.log("SQL executed 1");
      db.transaction((tx) => {

        console.log("BEGIN executeSql");
        tx.executeSql('SELECT * FROM Preference', [], (results) => {
      
          console.log(`results ${results}`);
          var row = results.rows.item(0);
          this.setState({prefuser: row.value});
          console.log(`my pref ${row.value}`);

          var len = results.rows.length;
          if(len > 0){
            console.log("LENGTH SUP");
            var row = results.rows.item(0);
            this.setState({prefuser: row.session_value});
          }else{
            console.log("LENGTH INF");
          }
      
        }).catch((error) =>{
          console.log("Received error: ", error)
          
        });
      });
      console.log("SQL executed 2");
  
    //}, 5000);
  }
  
  errorCB(err) {
    console.log("SQL Error: " + err);
  }

  successCB() {
    console.log("SQL executed fine");
  }

  
  () {
    console.log("Database OPENED");
    this.queryWithDelay();
  }

  populateDB = (tx) => {
    
    console.log("SQL POPULATE 1");
    tx.executeSql('DROP TABLE IF EXISTS Session;');
    tx.executeSql('CREATE TABLE IF NOT EXISTS Session( '
      + 'session_id INTEGER PRIMARY KEY NOT NULL, '
      + 'session_key VARCHAR(50), '
      + 'session_value VARCHAR(250) ); '
      ).catch((error) => {
        this.errorCB(error)
      });
    tx.executeSql('INSERT INTO Session (session_key, session_value) VALUES ("connected", "myUserNow");');
    console.log("SQL POPULATE 1");
  }

}


/*

          <LoginContainer/>
<Provider store={store}>
    <UserListContainer/>
</Provider>
      
<AppHeader/>
<Drawer/>
<UserListContainer/>
<DashboardContainer/> 

<View style={styles.container}>
  <Text style={styles.welcome}>
    Welcome to React Native!
  </Text>
</View>
*/

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    
  },
  highlight: {
    marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
      height: 50,
      borderRadius: 6,
      paddingLeft: 15,
      backgroundColor: 'green',
      alignItems: "center",
      justifyContent: "center",
  }

});

