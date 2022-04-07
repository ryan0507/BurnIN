import React from 'react';
import {createContext, useState} from 'react';
import axios from 'axios';

const SignUpContext = createContext();
export function SignUpContextProvider({children}) {
  const [form, setForm] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    age: '',
    height: '',
    weight: '',
    photo: '',
  });

  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };

  const sendId = async () => {
    try {
      await axios.post('/signUp/id', form.userId);
    } catch (e) {
      console.log(e);
    }
  };

  const sendNickname = async () => {
    try {
      axios.post('/signUp/nickname', form.nickname);
    } catch (e) {
      console.log(e);
    }
  };

  const signUp = async () => {
    try {
      axios.post('/signUp', form);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignUpContext.Provider
      value={{form, createChangeTextHandler, sendId, sendNickname, signUp}}>
      {children}
    </SignUpContext.Provider>
  );
}
export default SignUpContext;
