/* eslint-disable */
import React from 'react';
import {createContext, useState} from 'react';
import axios from 'axios';
import userStorages from '../storages/userStorages';
import loginStorages from '../storages/loginStorages';

const SignUpContext = createContext();
export function SignUpContextProvider({children}) {
  const [form, setForm] = useState({
    id: '',
    passwd: '',
    height: '',
    weight: '',
    photo: '',
  });

  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };

  const sendNickname = async () => {
    try {
      const res = await axios.post(
        'http://34.67.158.106:5000/nickname-check',
        form,
      );
    } catch (e) {
      console.log(e);
    }
  };

  const signUp = async () => {
    try {
      // send new user's information
      console.log(form);
      const res = await axios.post('http://34.67.158.106:5000/sign-up', form);

      // save token at loginStorage
      const {token} = res;
      await loginStorages.set(token);

      // save user info at userStorage
      await userStorages.set(form);
    } catch (e) {
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
