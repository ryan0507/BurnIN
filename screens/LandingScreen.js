import React, {useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import loginStorages from '../storages/loginStorages';

function LandingScreen({navigation}) {
  // AsyncStorage 확인
  // token 있으면 메인 페이지로 이동, 없으면 로그인 페이지로 이동
  // useEffect(() => {
  //   loginStorages
  //     .get()
  //     .then(() => {
  //       navigation.navigate('MainTab');
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       navigation.navigate('Login');
  //     });
  // }, [navigation]);

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1508325732378-00eafff6c504?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1553&q=80',
      }}
      style={styles.block}>
      <Text style={styles.logo}>BurnIN</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  block: {
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
