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
    height: '165', // 키 기본값
    weight: '60', // 몸무게 기본값
  });

  const createChangeTextHandler = name => value => {
    if (typeof value == 'string') {
      let lowerCase = value.toLowerCase();
      setForm({...form, [name]: lowerCase});
    } else {
      setForm({...form, [name]: value});
    }
  };

  const clearForm = () => {
    setForm({
      id: '',
      passwd: '',
      height: '165', // 키 기본값
      weight: '60', // 몸무게 기본값
    });
  };

  const sendNickname = async () => {
    try {
      const res = await axios.post(
        'http://34.67.158.106:5000/nickname-check',
        form,
      );
    } catch (e) {
      throw new Error(e);
    }
  };

  const signUp = async () => {
    try {
      // send new user's information
      const res = await axios.post('http://34.67.158.106:5000/sign-up', form);
      console.log(res);
      // save token at loginStorage
      const {access_token} = res.data;
      await loginStorages.set(access_token);

      // save user info at userStorage
      await userStorages.set(form);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignUpContext.Provider
      value={{form, createChangeTextHandler, sendNickname, signUp, clearForm}}>
      {children}
    </SignUpContext.Provider>
  );
}
export default SignUpContext;
