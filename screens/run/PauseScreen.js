import React from 'react';
import {View, Text} from 'react-native';

function PauseScreen({route}) {
  return (
    <View>
      <Text>러닝 멈춤!!!!</Text>
      <Text>{JSON.stringify(route.params.realtime.current)}</Text>
    </View>
  );
}

export default PauseScreen;
