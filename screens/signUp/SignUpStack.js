import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext, useState} from 'react';
import SignUpInput from './SignUpInput';
import InputScreen from '../InputScreen';
import CustomBtn from '../../components/CustomBtn';
import SignUpContext from '../../contexts/SignUpContext';
import {StatusBar, Text, View} from 'react-native';

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
  const {sendNickname} = useContext(SignUpContext);
  const [noti, setNoti] = useState(false);
  const onPress = () => {
    sendNickname()
      .then(() => {
        navigation.navigate('GetPassword');
      })
      .catch(() => {
        // 닉네임 중복 O - 노티 메시지 띄우기
        setNoti(true);
        setTimeout(() => {
          setNoti(false);
        }, 5000);
      });
  };
  return (
    <InputScreen>
      <SignUpInput field="id" placeholder="닉네임" smallBtn getPhoto />
      <View style={!noti && {opacity: 0}}>
        <Text style={{fontSize: 12, width: '100%', marginTop: 10}}>
          동일한 아이디가 존재합니다.
        </Text>
      </View>
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
      <SignUpInput field="passwd" placeholder="비밀번호" secureTextEntry />
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
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <InputScreen>
      <SignUpInput field="height" placeholder="키" picker />
      <SignUpInput field="weight" placeholder="몸무게" picker />
      <CustomBtn title="회원가입 완료" onPress={onPress} />
    </InputScreen>
  );
}
