import axios from 'axios';
import loginStorages from '../storages/loginStorages';
import userStorages from '../storages/userStorages';

export const login = async form => {
  try {
    const {data} = await axios.post('http://34.67.158.106:5000/login', form);
    const token = data.access_token;
    const weight = data.weight;
    const height = data.height;

    // save new token at loginStorage
    loginStorages.set(JSON.stringify(token));

    // save user information at userStorage
    const newdata = {
      ...form,
      height,
      weight,
    };
    await userStorages.set(JSON.stringify(newdata));

    return token;
  } catch (e) {
    throw new Error(e);
  }
};
