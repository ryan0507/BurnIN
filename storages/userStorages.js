import AsyncStorage from '@react-native-community/async-storage';

const key = 'userInfo';

const userStorages = {
  async get() {
    try {
      const userInfo = await AsyncStorage.getItem(key);
      if (!userInfo) {
        throw new Error('No Token');
      } else {
        return userInfo;
      }
    } catch (e) {
      throw new Error('No User Information');
    }
  },

  async set(newInfo) {
    try {
      await AsyncStorage.setItem(key, newInfo);
    } catch (e) {
      throw new Error('Failed to set userInfo');
    }
  },
};

export default userStorages;
