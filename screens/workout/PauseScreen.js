import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

function PauseScreen({route}) {
  useEffect(() => {
    console.log('pausescreen rendered');
  }, []);
  const time = route.params;
  return (
    <View>
      <Text>러닝 멈춤!!!!</Text>
      <Text>
        {`${time.hours() < 10 ? `0${time.hours()}` : time.hours()}:${
          time.minutes() < 10 ? `0${time.minutes()}` : time.minutes()
        }:${time.seconds() < 10 ? `0${time.seconds()}` : time.seconds()}`}
      </Text>
    </View>
  );
}

export default PauseScreen;
