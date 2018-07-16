import React, { Component } from 'react';
import { Modal, View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default class LoaderCreate extends Component {
    render(){
        const {
            loading,
            textvalue,
            ...attributes
        } = this.props;
        return (
            <Modal
                transparent={true}
                animationType={'none'}
                visible={loading}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <Text style={styles.leftText}>{textvalue}</Text>
                        <ActivityIndicator 
                            style={styles.rightindicator}
                            animating={loading} />
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 85,
        width: 300,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    rightindicator: {
        flex: 1,
        justifyContent: 'flex-end',
        marginRight: 20,
    },
    leftText: {
        flex: 1,
        justifyContent: 'flex-start',
        marginLeft: 20
    }
});