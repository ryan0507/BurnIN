import AsyncStorage from '@react-native-community/async-storage';

const key = 'token';

const loginStorages = {
  async get() {
    try {
      const loginToken = await AsyncStorage.getItem(key);

      if (!loginToken) {
        throw new Error('No Token');
      } else {
        return loginToken;
      }
    } catch (e) {
      throw new Error('Failed to get token');
    }
  },

  async set(newToken) {
    try {
      await AsyncStorage.setItem(key, newToken);
    } catch (e) {
      throw new Error('Failed to set token');
    }
  },
};

export default loginStorages;
