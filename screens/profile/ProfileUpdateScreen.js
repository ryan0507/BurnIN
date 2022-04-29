import React from 'react';
import {View, StyleSheet} from 'react-native';
import PhotoInput from '../../components/PhotoInput';
import SignUpInput from '../signUp/SignUpInput';
function ProfileUpdateScreen() {
  return (
    <View style={styles.block}>
      <PhotoInput />
      <SignUpInput field="nickname" placeholder="닉네임" smallBtn />
      <SignUpInput field="password" placeholder="비밀번호" secureTextEntry />
      <SignUpInput field="height" picker placeholder="키" />
      <SignUpInput field="weight" picker placeholder="몸무게" />
    </View>
  );
}
export default ProfileUpdateScreen;

const styles = StyleSheet.create({
  block: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 40,
    paddingTop: 48,
  },
});
