import React, {useState, useContext} from 'react';
import {View, Pressable, StyleSheet, Platform, Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import SignUpContext from '../contexts/SignUpContext';

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
        onChange(response.assets);
      },
    );
  };
  return (
    <View style={styles.block}>
      <Pressable onPress={onSelectImage}>
        <Image style={styles.photo} source={{uri: response?.assets[0]?.uri}} />
      </Pressable>
    </View>
  );
}

export default PhotoInput;

const styles = StyleSheet.create({
  block: {},
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(239,153,23,0.65)',
  },
});
