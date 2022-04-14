import React from 'react';
import {View, Pressable, Text, StyleSheet, Platform} from 'react-native';

function LoginBtn({onPress, title}) {
  return (
    <View style={[styles.block]}>
      <Pressable onPress={onPress} android_ripple={{color: '#ffffff'}}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
}

export default LoginBtn;

const styles = StyleSheet.create({
  block: {
    borderRadius: 4,
    flex: 1,
    marginTop: 120,
  },
  wrapper: {
    borderRadius: 10,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.76)',
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});
