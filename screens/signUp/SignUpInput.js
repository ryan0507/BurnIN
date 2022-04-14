import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SignUpContext from '../../contexts/SignUpContext';
import UnderlinedInput from '../../components/UnderlinedInput';
import PhotoInput from '../../components/PhotoInput';
import CustomSmallBtn from '../../components/CustomSmallBtn';

function SignUpInput({field, getPhoto, placeholder, smallBtn, ...rest}) {
  // 사용자가 입력한 값을 지정한 필드에 저장

  const {form, createChangeTextHandler} = useContext(SignUpContext);
  const onChangeText = createChangeTextHandler(field);
  const value = form[field];

  return (
    <View style={styles.block}>
      {getPhoto && <PhotoInput />}
      <View style={styles.innerBlock}>
        <Text style={styles.text}>{placeholder}</Text>
        <UnderlinedInput
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          {...rest}
        />
        {smallBtn && <CustomSmallBtn title="중복 확인" marginLeft />}
      </View>
    </View>
  );
}

export default SignUpInput;

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
  },
  innerBlock: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
    marginRight: 10,
  },
});
