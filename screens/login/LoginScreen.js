import React, {useState} from 'react';
import LoginBtn from '../../components/LoginBtn';
import InputScreen from '../InputScreen';
import UnderlinedInput from '../../components/UnderlinedInput';
import {login} from '../../modules/auth';
import {View, Text, StyleSheet} from 'react-native';
import loginStorages from '../../storages/loginStorages';

function LoginScreen({navigation}) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onPress = () => {
    const form = {id, password};
    login(form).then(() => {
      console.log(loginStorages.get());
      navigation.navigate('MainTab');
    });
  };

  return (
    <InputScreen isLogin>
      <View style={[styles.inputWrapper, styles.marginTop]}>
        <Text style={styles.text}>닉네임</Text>
        <UnderlinedInput
          placeholder="닉네임"
          value={id}
          onChangeText={setId}
          hasMarginBottom
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.text}>비밀번호</Text>
        <UnderlinedInput
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.btnWrapper}>
        <LoginBtn title="로그인" onPress={onPress} hasMarginBottom />
        <LoginBtn
          title="회원가입"
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        />
      </View>
    </InputScreen>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginTop: {
    marginTop: 150,
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  text: {
    marginRight: 10,
    color: 'black',
    flex: 0.2,
    fontSize: 12,
    fontFamily: 'SpoqaHanSansNeo-regular',
  },
});
