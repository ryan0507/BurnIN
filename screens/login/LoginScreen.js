import React, {useState} from 'react';
import CustomBtn from '../../components/CustomBtn';
import InputScreen from '../InputScreen';
import UnderlinedInput from '../../components/UnderlinedInput';

function LoginScreen({navigation}) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onPress = () => {
    // 서버 응답 코드가 200인 경우
    // 토큰 AysncStorage에 저장, Main으로 이동
    navigation.navigate('Main');

    // 가입 정보가 없는 경우 노티 메시지 띄우기
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
