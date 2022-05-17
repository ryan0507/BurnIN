import React from 'react';
import {View, Text} from 'react-native';

function TimeGraph({data}) {
  console.log(data);

  return (
    <View style={{height: 120, backgroundColor: 'lavender'}}>
      <Text>타임 그래프</Text>
    </View>
  );
}

export default TimeGraph;
