import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';

function InputScreen({children, isLogin}) {
  return (
    <>
      {isLogin && (
        <ImageBackground
          source={require('../assets/main.jpg')}
          style={styles.bgImg}>
          <View style={[styles.block, styles.loginBlock]}>
            <Text style={styles.logo}>BurnIN</Text>
            {children}
          </View>
        </ImageBackground>
      )}
      {!isLogin && <View style={styles.block}>{children}</View>}
    </>
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
  },
  loginBlock: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  bgImg: {
    width: '100%',
    height: '100%',
  },
  logo: {
    fontSize: 48,
    fontWeight: '600',
    fontStyle: 'italic',
    color: '#ffffff',
  },
});
