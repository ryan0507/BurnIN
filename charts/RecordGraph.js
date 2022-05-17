import React from 'react';
import {View, Text} from 'react-native';

function RecordGraph({data}) {
  console.log(data);
  return (
    <View style={{height: 120, backgroundColor: 'pink'}}>
      <Text>레코드 그래프</Text>
    </View>
  );
}

export default RecordGraph;
