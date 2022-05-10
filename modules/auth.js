import axios from 'axios';
import loginStorages from '../storages/loginStorages';

export const login = async form => {
  try {
    const token = await axios.post('http://34.67.158.106:5000/login', form);

    // save new token at loginStorage
    loginStorages.set(token);

    return token;
  } catch (e) {
    throw new Error();
  }
};
