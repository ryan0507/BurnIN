import React, {useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import loginStorages from '../storages/loginStorages';

function LandingScreen({navigation}) {
  // AsyncStorage 확인
  // token 있으면 메인 페이지로 이동, 없으면 로그인 페이지로 이동
  useEffect(() => {
    loginStorages
      .get()
      .then(() => {
        navigation.navigate('MainTab');
      })
      .catch(error => {
        console.log(error);
        navigation.navigate('Login');
      });
  }, [navigation]);

  return (
    <View style={styles.block}>
      <Text>BurnIN!!!!!!</Text>
      <Button
        title="시작하기"
        onPress={() => {
          navigation.push('Login');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default LandingScreen;
