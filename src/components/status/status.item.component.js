import React from 'react'
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const getIconName = (statusId) => {
    switch (statusId) {
        case 1:
            return 'forward'     // STATUT_BROUILLON_KEY
        case 2:
            return 'pencil'      // STATUT_PRISE_EN_CHARGE_KEY
        case 3:
            return 'thumbs-down' // STATUT_REFUSE_KEY
        case 4:
            return 'check'       // STATUT_LIVRE_KEY
        case 5:
            return 'thumbs-up'   // STATUT_VALIDE_KEY
        case 6:
            return 'close'       // STATUT_CLOS_KEY
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: "white"
    },
    iconLeft: {
        marginLeft: 8,
        marginRight: 8,
        fontSize: 20,
        color: '#444',
        width: 24
    },
    text: {
        color: '#444',
        fontSize: 14
    }
})


const StatusItem = ({item, showModal}) => {
    return (
        <TouchableHighlight underlayColor='transparent'
                            onPress={() => showModal(false, {status: true, statusId: item.statut_id})}>
            <View style={styles.container}>
                <Icon name={getIconName(parseInt(item.statut_id, 10))} style={styles.iconLeft}/>
                <Text style={styles.text}>{item.statut_libelle}</Text>
            </View>
        </TouchableHighlight>
    )
}

export default StatusItem
