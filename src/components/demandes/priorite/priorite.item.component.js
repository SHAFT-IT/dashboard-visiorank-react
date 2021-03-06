import React from 'react';
import { Platform, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const getIconName = (priorityId) => {
  switch (priorityId) {
    case 1:
      return 'arrow-up';     // Haute
    case 2:
      return 'arrow-right';      // Normal
    case 3:
      return 'arrow-down'; // Basse
  }
};

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'android' ? 30 : 40,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  iconLeft: {
    marginLeft: 8,
    marginRight: 8,
    fontSize: 16,
    color: '#444',
    width: 24
  },
  text: {
    color: '#444',
    fontSize: 12
  }
});

export default ({ item, showModal }) => {
  return (
    <TouchableHighlight underlayColor='transparent'
                        onPress={() => showModal(false, { priority: true, priorityId: item.priorite_id })}>
      <View style={styles.container}>
        <Icon name={getIconName(parseInt(item.priorite_id, 10))} style={styles.iconLeft}/>
        <Text style={styles.text}>{item.priorite_libelle}</Text>
      </View>
    </TouchableHighlight>
  );
}
