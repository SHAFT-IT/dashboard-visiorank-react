const KEY = '@shaft:visiorank'

export const setData = async (key, value) => {
    try {
        await AsyncStorage.setItem(`${KEY}:${key}`, JSON.stringify(value));
        console.log('setData success', key, value)
    } catch (error) {
        // Error saving data
    }
}

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(`${KEY}:${key}`);
        console.log('getData success', key, value)
        return JSON.parse(value)
    } catch (error) {
        return null
    }
}
