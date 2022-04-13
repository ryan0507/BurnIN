import React from 'react';
import {View, Pressable, Text, StyleSheet, Platform} from 'react-native';

function CustomBtn({onPress, title, hasMarginBottom, hasNoMarginTop}) {
  return (
    <View
      style={[
        styles.block,
        hasMarginBottom && styles.margin,
        hasNoMarginTop && styles.noMarginTop,
      ]}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          styles.wrapper,
          Platform.OS === 'ios' && pressed && {opacity: 0.5},
        ]}
        android_ripple={{color: '#ffffff'}}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
}

export default CustomBtn;

const styles = StyleSheet.create({
  block: {
    borderRadius: 4,
    marginTop: 64,
    width: '100%',
  },
  noMarginTop: {
    marginTop: 0,
  },
  wrapper: {
    borderRadius: 10,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ef9917',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ffffff',
  },
  margin: {
    marginBottom: 8,
  },
});
