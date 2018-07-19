/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import store from './src/store'
import {Provider} from 'react-redux'
import {StyleSheet, View} from 'react-native'
import Splash from './src/components/splash/splash';
import OfflineNotice from "./src/components/internet/offline.notice";

var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({name: 'visiorank.db', createFromLocation: "~visiorank.db"}, this.openCB, this.errorCB);

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            prefuser: "",
        };
    }

    componentDidMount() {
        console.disableYellowBox = true;
    }

    render() {
        return (
            <Provider store={store()}>
                <View style={styles.container}>
                    <OfflineNotice/>
                    <Splash/>
                </View>
            </Provider>
        );
    }

    queryWithDelay = () => {
        console.log("SQL executed 1");
        db.transaction((tx) => {
            console.log("BEGIN executeSql");
            tx.executeSql('SELECT * FROM Preference', [], (results) => {
                console.log(`results ${results}`);
                var row = results.rows.item(0);
                this.setState({prefuser: row.value});
                console.log(`my pref ${row.value}`);
                var len = results.rows.length;
                if (len > 0) {
                    console.log("LENGTH SUP");
                    var row = results.rows.item(0);
                    this.setState({prefuser: row.session_value});
                } else {
                    console.log("LENGTH INF");
                }
            }).catch((error) => {
                console.log("Received error: ", error)
            });
        });
        console.log("SQL executed 2");
    }

    errorCB(err) {
        console.log("SQL Error: " + err);
    }

    successCB() {
        console.log("SQL executed fine");
    }

    openCB() {
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
