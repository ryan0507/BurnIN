import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function InputScreen({children, isLogin}) {
  return (
    <SafeAreaView style={styles.block}>
      {isLogin && <Text style={styles.logo}>BurnIN</Text>}
      {children}
    </SafeAreaView>
  );
}

export default InputScreen;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 50,
    backgroundColor: '#ffffff',
    // backgroundColor: 'blue',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});
