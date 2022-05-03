import React, {useEffect, useCallback, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';

function PauseScreen({route}) {
  const day = useRef(moment().day());
  useEffect(() => {
    console.log('pausescreen rendered');
  }, []);
  const time = route.params;
  const parseDay = () => {
    let result = '';
    switch (day) {
      case 0:
        result = '일요일';
        break;
      case 1:
        result = '월요일';
        break;
      case 2:
        result = '화요일';
        break;
      case 3:
        result = '수요일';
        break;
      case 4:
        result = '목요일';
        break;
      case 5:
        result = '금요일';
        break;
      case 6:
        result = '토요일';
        break;
    }
    return result;
  };
  console.log(parseDay);

  return (
    <View style={styles.block}>
      <Text>{moment().format('YYYY.MM.DD')}</Text>
      <Text>
        {`시간 ${time.hours() < 10 ? `0${time.hours()}` : time.hours()}:${
          time.minutes() < 10 ? `0${time.minutes()}` : time.minutes()
        }:${time.seconds() < 10 ? `0${time.seconds()}` : time.seconds()}`}
      </Text>
      <Text>거리</Text>
    </View>
  );
}
export default PauseScreen;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});
