import React from 'react';
import {View, StyleSheet} from 'react-native';

function OrangeBlock({children}) {
  return <View style={styles.block}>{children}</View>;
}

export default OrangeBlock;

const styles = StyleSheet.create({
  block: {
    backgroundColor: '#F4BC68',
    height: 186,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    position: 'relative',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 25,
  },
});
