import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

function LandingScreen({navigation}) {
  return (
    <View style={styles.block}>
      <Text>BurnIN!!!!!!</Text>
      <Button
        title="시작하기"
        onPress={() => {
          navigation.push('Login');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default LandingScreen;
