import axios from 'axios';

export const login = async form => {
  try {
    const token = await axios.post('/login', form);
    return token;
  } catch (e) {
    console.log(e);
  }
};
