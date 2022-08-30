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
    marginTop: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.76)',
    height: 48,
    width: 135,
    borderRadius: 10,
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});
