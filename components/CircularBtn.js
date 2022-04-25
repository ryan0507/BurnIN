import React from 'react';
import {View, Pressable, Text, StyleSheet, Platform} from 'react-native';

function CircularBtn({onPress, children, white, wideMargin}) {
  return (
    <View
      style={[
        styles.block,
        white && styles.reverse,
        wideMargin && styles.wideMargin,
      ]}>
      <Pressable onPress={onPress} android_ripple={{color: '#ffffff'}}>
        {/* <Text style={styles.text}>{title}</Text> */}
        {children}
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
  reverse: {
    backgroundColor: '#ffffff',
  },
  margin: {
    marginBottom: 8,
  },
  wideMargin: {
    marginBottom: 75,
  },
});
