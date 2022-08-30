import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import loginStorages from '../storages/loginStorages';

function LandingScreen({navigation}) {
  // AsyncStorage 확인
  // token 있으면 메인 페이지로 이동, 없으면 로그인 페이지로 이동

  // useEffect(() => {
  //   AsyncStorage.clear();
  // }, []);

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
    <ImageBackground
      source={require('../assets/main.jpg')}
      style={styles.image}>
      <Text style={styles.logo}>BurnIN</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 72,
    color: '#ffffff',
    fontWeight: '700',
  },
});
export default LandingScreen;
