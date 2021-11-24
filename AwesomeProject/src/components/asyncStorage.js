import AsyncStorage from '@react-native-async-storage/async-storage';


export const storageKeys = {
  loginDetails:"ACCESS_TOKEN"
}

export const storeData = async (key,value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      // saving error
        console.log(e)
    }
  }


  export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      return JSON.parse(value)
    } catch(e) {
      // error reading value
    }
  }


  export const removeValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
  }