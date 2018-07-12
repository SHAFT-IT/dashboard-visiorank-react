import React, { Component } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';

export default class LoaderDelete extends Component {
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
                        <Text>{textvalue}</Text>
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
        width: 270,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});