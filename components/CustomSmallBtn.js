import React from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';

function CustomSmallBtn({onPress, title, marginLeft}) {
  return (
    <View style={[styles.block, marginLeft && styles.marginLeft]}>
      <Pressable android_ripple={{color: '#ffffff'}} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
}

export default CustomSmallBtn;

const styles = StyleSheet.create({
  block: {
    borderRadius: 14,
    borderColor: '#ef9917',
    borderWidth: 1,
    width: 72,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239,153,23,0.05)',
  },
  marginLeft: {
    marginLeft: 10,
  },
  text: {
    fontWeight: '600',
    fontSize: 12,
    color: '#ef9917',
  },
  margin: {
    marginBottom: 8,
  },
});
