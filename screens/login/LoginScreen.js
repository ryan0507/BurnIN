import React, {useState} from 'react';
import LoginBtn from '../../components/LoginBtn';
import InputScreen from '../InputScreen';
import UnderlinedInput from '../../components/UnderlinedInput';
import {login} from '../../modules/auth';
import {View, Text, StyleSheet} from 'react-native';
import loginStorages from '../../storages/loginStorages';

function LoginScreen({navigation}) {
  const [id, setId] = useState('');
  const [passwd, setPasswd] = useState('');
  const [noti, setNoti] = useState(false);

  const onPress = () => {
    const form = {id, passwd};
    login(form)
      .then(() => {
        navigation.reset({routes: [{name: 'MainTab'}]});
      })
      .catch(e => {
        console.log(e);
        setNoti(true);
        setTimeout(() => {
          setNoti(false);
        }, 5000);
      });
  };

  return (
    <InputScreen isLogin>
      <View style={[styles.inputWrapper, styles.marginTop]}>
        <Text style={styles.text}>아이디</Text>
        <UnderlinedInput
          placeholder="아이디"
          value={id}
          onChangeText={setId}
          hasMarginBottom
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.text}>비밀번호</Text>
        <UnderlinedInput
          placeholder="비밀번호"
          value={passwd}
          onChangeText={setPasswd}
        />
      </View>
      <Text style={[styles.noti, !noti && styles.inivisble]}>
        {`등록되지 않은 아이디이거나
아이디 혹은 비밀번호를 잘못 입력했습니다.`}
      </Text>
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
  noti: {
    color: 'white',
    fontSize: 12,
    marginTop: 20,
    width: '100%',
  },
  inivisble: {
    opacity: 0,
  },
});
