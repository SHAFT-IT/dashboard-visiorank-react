import DefaultPreference from 'react-native-default-preference';
const KEY = '@shaft:visiorank'

export const setData = (key, value) => {
    try {
        DefaultPreference.set(`${KEY}:${key}`, JSON.stringify(value)).then(function() {console.log(`PREFERENCE SET WITH KEY ${key} AND VALUE ${value}`)});
        console.log('setData success');
    } catch (error) {
        // Error saving data
    }
}

export const getData = (key) => {
    return DefaultPreference.get(`${KEY}:${key}`)
}
