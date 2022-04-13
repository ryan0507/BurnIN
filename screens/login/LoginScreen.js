import React, {useState} from 'react';
import loginStorages from '../../storages/loginStorages';
import CustomBtn from '../../components/CustomBtn';
import InputScreen from '../InputScreen';
import UnderlinedInput from '../../components/UnderlinedInput';
import {login} from '../../modules/auth';

function LoginScreen({navigation}) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onPress = () => {
    const form = {id, password};
    // login(form);
    navigation.navigate('MainTab');
  };

  return (
    <InputScreen isLogin>
      <UnderlinedInput
        placeholder="아이디"
        value={id}
        onChangeText={setId}
        hasMarginBottom
      />
      <UnderlinedInput
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
      />
      <CustomBtn title="로그인" onPress={onPress} hasMarginBottom />
      <CustomBtn
        title="회원가입"
        onPress={() => {
          navigation.navigate('SignUp');
        }}
        hasNoMarginTop
      />
    </InputScreen>
  );
}

export default LoginScreen;
