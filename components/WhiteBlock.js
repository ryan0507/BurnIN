import React from 'react';
import {View, StyleSheet} from 'react-native';

function WhiteBlock({children, ver2}) {
  return (
    <View style={[ver2 ? styles.block2 : styles.block]}>
      <View style={[ver2 ? styles.innerBlock2 : styles.innerBlock]}>
        {children}
      </View>
    </View>
  );
}

export default WhiteBlock;

const styles = StyleSheet.create({
  block: {
    overflow: 'hidden',
    paddingBottom: 4,
    borderRadius: 16,
    position: 'absolute',
    top: 100,
    width: '100%',
  },
  block2: {
    overflow: 'hidden',
    paddingBottom: 4,
    borderRadius: 16,
    position: 'absolute',
    top: 256,
    width: '100%',
  },
  innerBlock: {
    height: 125,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(104, 110, 222, 0.1)',
    shadowColor: 'rgba(75, 79, 156, 0.1)',
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  innerBlock2: {
    height: 80,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(104, 110, 222, 0.1)',
    shadowColor: 'rgba(75, 79, 156, 0.1)',
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
});
