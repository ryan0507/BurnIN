import React, {useEffect, useCallback, useRef, useContext} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import CircularBtn from '../../components/CircularBtn';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WorkOutContext from '../../contexts/WorkOutContext';

function PauseScreen({navigation, route}) {
  const {time, totalDist, calories, currentPace} = route.params;
  const {dispatch} = useContext(WorkOutContext);

  const onPress = () => {
    const record = {
      time: time.asSeconds(),
      distance: totalDist,
      calories,
    };
    dispatch({type: 'UPDATE_RECORD', payload: record});

    navigation.navigate('ResultScreen', {
      time,
      totalDist,
      calories,
      currentPace,
    });
  };

  return (
    <>
      <StatusBar backgroundColor="#000000" />
      <View style={styles.block}>
        <View style={styles.recordsBlock}>
          <View style={styles.recordItem}>
            <Text style={[styles.recordText, styles.medium]}>
              {currentPace}
            </Text>
            <Text style={[styles.recordText, styles.small]}>페이스</Text>
          </View>
          <View style={styles.recordItem}>
            <Text style={[styles.recordText, styles.medium]}>
              {`${
                time.minutes() < 10 ? `0${time.minutes()}` : time.minutes()
              }:${time.seconds() < 10 ? `0${time.seconds()}` : time.seconds()}`}
            </Text>
            <Text style={[styles.recordText, styles.small]}>시간</Text>
          </View>
          <View style={styles.recordItem}>
            <Text style={[styles.recordText, styles.medium]}>{calories}</Text>
            <Text style={[styles.recordText, styles.small]}>칼로리</Text>
          </View>
        </View>
        <View style={styles.distBlock}>
          <Text style={[styles.recordText, styles.large]}>
            {totalDist.toFixed(2)}
          </Text>
          <Text style={[styles.recordText, styles.medium]}>킬로미터</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CircularBtn
            onPress={() => {
              navigation.goBack('RunningScreen');
            }}
            white
            wideMargin>
            <Text style={styles.btnText}>러닝 재개</Text>
          </CircularBtn>
          <CircularBtn onPress={onPress} white wideMargin small>
            <Icon name="stop" size={18} />
          </CircularBtn>
        </View>
      </View>
    </>
  );
}
export default PauseScreen;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 48,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  recordsBlock: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  distBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordItem: {
    alignItems: 'center',
  },
  recordText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  small: {
    fontSize: 18,
  },
  medium: {
    fontSize: 32,
  },
  large: {
    fontSize: 100,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '700',
  },
});
