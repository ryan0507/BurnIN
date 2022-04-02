import React, {useContext} from 'react';
import {TextInput} from 'react-native';
import SignUpContext from '../../contexts/SignUpContext';
import UnderlinedInput from '../../components/UnderlinedInput';

function SignUpInput({field, isPhoto, ...rest}) {
  // 사용자가 입력한 값을 지정한 필드에 저장

  const {form, createChangeTextHandler} = useContext(SignUpContext);
  const onChangeText = createChangeTextHandler(field);
  const value = form[field];

  return (
    <>
      {isPhoto ? (
        <TextInput /> // 사진 입력용 Input
      ) : (
        <UnderlinedInput {...rest} onChangeText={onChangeText} value={value} />
      )}
    </>
  );
}

export default SignUpInput;
