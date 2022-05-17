import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext, useState} from 'react';
import SignUpInput from './SignUpInput';
import InputScreen from '../InputScreen';
import CustomBtn from '../../components/CustomBtn';
import SignUpContext from '../../contexts/SignUpContext';
import {StatusBar, Text, View} from 'react-native';
import {isId, isPassword} from '../../modules/Regex';

function SignUpStack() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <StatusBar backgroundColor="#EF9917" />
      <Stack.Navigator initialRouteName="GetNickname">
        <Stack.Screen
          name="GetNickname"
          component={GetNickname}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GetPassword"
          component={GetPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GetHeightWeight"
          component={GetHeightWeight}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
}

export default SignUpStack;
function GetNickname({navigation}) {
  const {sendNickname, form} = useContext(SignUpContext);
  const [noti, setNoti] = useState(0);
  const msgs = [
    '',
    '동일한 아이디가 존재합니다.',
    '아이디 형식을 확인해주세요. 영문으로 시작해야 해요!',
  ];
  const onPress = () => {
    if (isId(form.id) === false) {
      setNoti(2);
      setTimeout(() => {
        setNoti(0);
      }, 3000);
    } else {
      sendNickname()
        .then(() => {
          navigation.navigate('GetPassword');
        })
        .catch(() => {
          // 닉네임 중복 O - 노티 메시지 띄우기
          setNoti(1);
          setTimeout(() => {
            setNoti(0);
          }, 5000);
        });
    }
  };
  return (
    <InputScreen>
      <SignUpInput
        field="id"
        title="아이디"
        placeholder="5~20자의 영문 숫자 조합"
        smallBtn
      />
      <Text
        style={{
          fontSize: 12,
          width: '100%',
          marginTop: 10,
        }}>
        {msgs[noti]}
      </Text>
      <CustomBtn title="다음" onPress={onPress} />
    </InputScreen>
  );
}

function GetPassword({navigation}) {
  const [noti, setNoti] = useState(false);
  const {form} = useContext(SignUpContext);

  const onPress = () => {
    if (!isPassword(form.passwd)) {
      setNoti(true);
      setTimeout(() => {
        setNoti(false);
      }, 3000);
    } else {
      navigation.navigate('GetHeightWeight');
    }
  };
  return (
    <InputScreen>
      <SignUpInput
        field="passwd"
        title="비밀번호 "
        placeholder="8~15자의 영문 숫자 조합"
        secureTextEntry
      />
      <View style={noti ? {width: '100%'} : {width: '100%', opacity: 0}}>
        <Text
          style={{
            fontSize: 12,
            width: '100%',
            marginTop: 10,
          }}>
          비밀번호 형식을 확인해주세요.
        </Text>
      </View>
      <CustomBtn title="다음" onPress={onPress} />
    </InputScreen>
  );
}

function GetHeightWeight({navigation}) {
  const {signUp, clearForm} = useContext(SignUpContext);

  const onPress = () => {
    // 서버로 모든 데이터 전송
    signUp()
      .then(() => {
        // 응답 성공 시 Main으로 화면 이동
        navigation.reset({routes: [{name: 'MainTab'}]});
        clearForm();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <InputScreen>
      <SignUpInput title="키" field="height" placeholder="키" picker />
      <SignUpInput title="체중" field="weight" placeholder="몸무게" picker />
      <CustomBtn title="회원가입 완료" onPress={onPress} />
    </InputScreen>
  );
}
