import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import SignUpInput from './SignUpInput';
import InputScreen from '../InputScreen';
import CustomBtn from '../../components/CustomBtn';
import {SignUpContextProvider} from '../../contexts/SignUpContext';
import SignUpContext from '../../contexts/SignUpContext';

function SignUpStack() {
  const Stack = createNativeStackNavigator();
  return (
    <SignUpContextProvider>
      <Stack.Navigator initialRouteName="GetId">
        <Stack.Screen
          name="GetId"
          component={GetId}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GetPassword"
          component={GetPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GetNickname"
          component={GetNickname}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GetHeightWeight"
          component={GetHeightWeight}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GetPhoto"
          component={GetPhoto}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </SignUpContextProvider>
  );
}

export default SignUpStack;

function GetId({navigation}) {
  const {sendId} = useContext(SignUpContext);

  const onPress = () => {
    sendId()
      .then(() => {
        // 아이디 중복 X - 비밀번호 입력 화면으로 이동
        navigation.navigate('GetPassword');
      })
      .catch(() => {
        // 아이디 중복 O - 노티 메시지 띄우기
      });
  };
  return (
    <InputScreen>
      <SignUpInput field="id" placeholder="아이디" />
      <CustomBtn title="다음" onPress={onPress} />
      <CustomBtn
        title="로그인으로 되돌아가기"
        onPress={() => {
          navigation.goBack();
        }}
        hasNoMarginTop
      />
    </InputScreen>
  );
}

function GetPassword({navigation}) {
  const onPress = () => {
    navigation.navigate('GetNickname');
  };
  return (
    <InputScreen>
      <SignUpInput field="password" placeholder="비밀번호" />
      <CustomBtn title="다음" onPress={onPress} />
    </InputScreen>
  );
}

function GetNickname({navigation}) {
  const {sendNickname} = useContext(SignUpContext);

  const onPress = () => {
    sendNickname()
      .then(() => {
        // 닉네임 중복 X - 키몸무게 입력 화면으로 이동
        navigation.navigate('GetHeightWeight');
      })
      .catch(() => {
        // 닉네임 중복 O - 노티 메시지 띄우기
      });
  };
  return (
    <InputScreen>
      <SignUpInput field="nickname" placeholder="닉네임" />
      <CustomBtn title="다음" onPress={onPress} />
    </InputScreen>
  );
}

function GetHeightWeight({navigation}) {
  const onPress = () => {
    navigation.navigate('GetPhoto');
  };
  return (
    <InputScreen>
      <SignUpInput field="height" placeholder="키" />
      <SignUpInput field="weight" placeholder="몸무게" />
      <CustomBtn title="다음" onPress={onPress} />
    </InputScreen>
  );
}

function GetPhoto({navigation}) {
  const {signUp} = useContext(SignUpContext);

  const onPress = () => {
    // 서버로 모든 데이터 전송
    signUp()
      .then(() => {
        // 응답 성공 시 Main으로 화면 이동
        navigation.navigate('MainTab');
      })
      .catch(() => {});
  };
  return (
    <InputScreen>
      <SignUpInput field="photo" />
      <CustomBtn title="가입하기" onPress={onPress} />
    </InputScreen>
  );
}
