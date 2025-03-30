import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to store data in AsyncStorage
export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error storing data', e);
  }
};

// Function to retrieve data from AsyncStorage
export const getData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error retrieving data', e);
    return null;
  }
};

// Function to remove data from AsyncStorage
export const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Error removing data', e);
  }
};

// Function to clear all data from AsyncStorage
export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error('Error clearing all data', e);
  }
};
