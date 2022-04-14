import React from 'react';
import {View, Pressable, Text, StyleSheet, Platform} from 'react-native';

function CircularBtn({onPress, title}) {
  return (
    <View style={styles.block}>
      <Pressable onPress={onPress} android_ripple={{color: '#ffffff'}}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
}

export default CircularBtn;

const styles = StyleSheet.create({
  block: {
    borderRadius: 55,
    height: 110,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ef9917',
    marginBottom: 28,
  },
  text: {
    fontWeight: '600',
    fontSize: 24,
    color: '#ffffff',
  },
  margin: {
    marginBottom: 8,
  },
});
