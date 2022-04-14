import axios from 'axios';
import loginStorages from '../storages/loginStorages';

export const login = async form => {
  try {
    // const token = await axios.post('/sign-up', form);

    // (temp)test for axios request
    const res = await axios.get(
      'https://jsonplaceholder.typicode.com/comments/1',
    );
    const token = res.data.name;

    // save new token at loginStorage
    loginStorages.set(token);

    return token;
  } catch (e) {
    console.log(e);
  }
};
