import {AsyncStorage} from 'react-native';

const userId = '8ba790f3-5acd-4a08-bc6a-97a36c124f29';

export default class Storage {
    static asyncSave = async (key, value) => {
        await AsyncStorage.setItem(key, value);
    };

    static asyncGet = (key) => {
        return AsyncStorage.getItem(key, (error, value) => {
            if (!error) {
                if (value !== null) {
                    alert(value)
                    return value
                }
            }
        });
    }

    static asyncDelete = async (key) => {
        await AsyncStorage.removeItem(key)
    }
}


