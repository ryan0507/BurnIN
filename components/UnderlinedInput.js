import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

function UnderlinedInput({hasMarginBottom, ...rest}) {
  return (
    <View style={styles.block}>
      <TextInput
        style={[styles.input, hasMarginBottom && styles.margin]}
        {...rest}
      />
    </View>
  );
}
export default UnderlinedInput;

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  input: {
    backgroundColor: '#f9f6f2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 36,
    borderRadius: 10,
    fontSize: 12,
  },
  margin: {
    marginBottom: 16,
  },
});
