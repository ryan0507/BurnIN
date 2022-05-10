import React, {useState, useContext} from 'react';
import {View, Text, Pressable, StyleSheet, Platform, Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import SignUpContext from '../contexts/SignUpContext';
import CustomSmallBtn from './CustomSmallBtn';

function PhotoInput() {
  const [response, setResponse] = useState();
  const {createChangeTextHandler} = useContext(SignUpContext);
  const onChange = createChangeTextHandler('photo');
  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        if (res.didCancel) {
          return;
        }
        setResponse(res);
        // onChange(res.assets[0].uri);
        onChange(null);
      },
    );
  };
  return (
    <View style={styles.block}>
      <Image style={styles.photo} source={{uri: response?.assets[0]?.uri}} />
      <CustomSmallBtn onPress={onSelectImage} title="사진 선택" />
    </View>
  );
}

export default PhotoInput;

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    marginBottom: 28,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 14,
    backgroundColor: 'rgba(239,153,23,0.65)',
  },
});
