import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import SignUpInput from './SignUpInput';
import InputScreen from '../InputScreen';
import CustomBtn from '../../components/CustomBtn';
import {SignUpContextProvider} from '../../contexts/SignUpContext';
import SignUpContext from '../../contexts/SignUpContext';
import {StatusBar} from 'react-native';

function SignUpStack() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <StatusBar backgroundColor="#EF9917" />
      <SignUpContextProvider>
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
      </SignUpContextProvider>
    </>
  );
}

export default SignUpStack;
function GetNickname({navigation}) {
  const {sendNickname} = useContext(SignUpContext);

  const onPress = () => {
    sendNickname()
      .then(() => {
        navigation.navigate('GetPassword');
      })
      .catch(() => {
        // 닉네임 중복 O - 노티 메시지 띄우기
      });
  };
  return (
    <InputScreen>
      <SignUpInput field="nickname" placeholder="닉네임" smallBtn />
      <CustomBtn title="다음으로" onPress={onPress} />
    </InputScreen>
  );
}

function GetPassword({navigation}) {
  const onPress = () => {
    navigation.navigate('GetHeightWeight');
  };
  return (
    <InputScreen>
      <SignUpInput field="password" placeholder="비밀번호" />
      <CustomBtn title="다음" onPress={onPress} />
    </InputScreen>
  );
}

function GetHeightWeight({navigation}) {
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
      <SignUpInput field="height" placeholder="키" />
      <SignUpInput field="weight" placeholder="몸무게" />
      <CustomBtn title="회원가입 완료" onPress={onPress} />
    </InputScreen>
  );
}
