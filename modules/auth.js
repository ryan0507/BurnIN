import axios from 'axios';
import loginStorages from '../storages/loginStorages';
import userStorages from '../storages/userStorages';

export const login = async form => {
  try {
    const res = await axios.post('http://34.67.158.106:5000/login', form);
    const token = res.data.access_token;

    // save new token at loginStorage
    loginStorages.set(JSON.stringify(token));

    // save user information at userStorage
    // userStorages.set(JSON.stringify(form));

    return token;
  } catch (e) {
    throw new Error(e);
  }
};
