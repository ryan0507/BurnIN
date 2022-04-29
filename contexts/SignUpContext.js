/* eslint-disable */
import React from 'react';
import {createContext, useState} from 'react';
import axios from 'axios';
import userStorages from '../storages/userStorages';

const SignUpContext = createContext();
export function SignUpContextProvider({children}) {
  const [form, setForm] = useState({
    nickname: '',
    password: '',
    height: '',
    weight: '',
    photo: '',
  });

  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };

  const sendNickname = async () => {
    try {
      const res = await axios.post('/signUp/nickname', form.nickname);
    } catch (e) {
      console.log(e);
    }
  };

  const signUp = async () => {
    try {
      console.log(form);
      // const res = await axios.post('http://34.67.158.106:5000/sign-up', form);

      // save token at loginStorage

      // save user info at userStorage
      await userStorages.set(form);
      console.log('saved user information at userStorage');
    } catch (e) {
      console.log('failed to save user information at userStorage');
      console.log(e);
    }
  };

  return (
    <SignUpContext.Provider
      value={{form, createChangeTextHandler, sendNickname, signUp}}>
      {children}
    </SignUpContext.Provider>
  );
}
export default SignUpContext;
