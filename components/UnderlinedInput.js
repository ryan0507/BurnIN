import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

function UnderlinedInput({hasMarginBottom, ...rest}) {
  return (
    <TextInput
      style={[styles.input, hasMarginBottom && styles.margin]}
      {...rest}
    />
  );
}
export default UnderlinedInput;

const styles = StyleSheet.create({
  input: {
    borderColor: '#bdbdbd',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    height: 48,
    width: '100%',
  },
  margin: {
    marginBottom: 16,
  },
});
