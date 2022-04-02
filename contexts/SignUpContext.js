import React from 'react';
import {createContext, useState} from 'react';

const SignUpContext = createContext();
export function SignUpContextProvider({children}) {
  const [form, setForm] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    height: '',
    weight: '',
  });

  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };

  return (
    <SignUpContext.Provider value={{form, createChangeTextHandler}}>
      {children}
    </SignUpContext.Provider>
  );
}

export default SignUpContext;
