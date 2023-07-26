import AsyncStorage from '@react-native-async-storage/async-storage';
const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (!value) {
      console.log('không có=> dataUser');
      return null;
    }

    return JSON.parse(value);
  } catch (e) {
    console.log('get error =>', key);
    return null;
  }
};
const setData = async (key: string, valun: object) => {
  try {
    const jsonValue = JSON.stringify(valun);
    await AsyncStorage.setItem(key, jsonValue);
    return 0;
  } catch (error) {
    console.log('set error =>', key);
    return null;
  }
};
const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return 0;
  } catch (error) {
    console.log('remove error =>', key);
    return null;
  }
};
export const LocalStorage = {
  getData,
  setData,
  removeData,
};
