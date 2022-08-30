import React from 'react';
import {View, Pressable, Text, StyleSheet, Platform} from 'react-native';

function CircularBtn({onPress, children, white, wideMargin, small}) {
  return (
    <View
      style={[
        styles.block,
        white && styles.reverse,
        wideMargin && styles.wideMargin,
        small && styles.small,
      ]}>
      <Pressable onPress={onPress} android_ripple={{color: '#ffffff'}}>
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
  small: {
    width: 64,
    height: 64,
    marginLeft: 40,
  },
});
