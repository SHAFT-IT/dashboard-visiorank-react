import { Alert } from 'react-native';

export const AlertError = (textErrorValue) => {
  Alert.alert(
      '',
      textErrorValue,
      [
          {text: 'OK', onPress: () => {}},
      ],
      { cancelable: true }
  )
}