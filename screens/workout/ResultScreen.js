import React, {useContext} from 'react';
import {View, Text, Pressable, StyleSheet, StatusBar} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WorkOutContext from '../../contexts/WorkOutContext';

function ResultScreen({navigation, route}) {
  const {time, totalDist, calories, currentPace} = route.params;
  const {locations, dispatch} = useContext(WorkOutContext);
  console.log(locations);

  return (
    <>
      <StatusBar backgroundColor="#F3F6FB" />
      <View style={styles.block}>
        <View style={styles.upperBlock}>
          <View style={styles.button}>
            <Pressable
              onPress={() => {
                dispatch({type: 'CLEAR_WORKOUT'});
                navigation.navigate('MainTab', {screen: 'WorkOutScreen'});
              }}>
              <Icon name="home" size={20} />
            </Pressable>
          </View>
          <Text style={styles.date}>{moment().format('YYYY.MM.DD')}</Text>
        </View>
        <MapView
          initialRegion={{
            latitude: 37.56578,
            longitude: 126.9386,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}>
          <Polyline coordinates={locations} strokeColor="#EF9917" />
        </MapView>
        <View style={{width: '100%'}}>
          <View style={styles.whiteBlock}>
            <Text>
              {`${time.hours() < 10 ? `0${time.hours()}` : time.hours()}:${
                time.minutes() < 10 ? `0${time.minutes()}` : time.minutes()
              }:${time.seconds() < 10 ? `0${time.seconds()}` : time.seconds()}`}
            </Text>
            <Text>총 달린 시간</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={styles.greyBlock}>
                <Text>{totalDist.toFixed(2)}</Text>
                <Text>km</Text>
              </View>
              <View style={styles.greyBlock}>
                <Text>{calories}</Text>
                <Text>kcal</Text>
              </View>
              <View style={styles.greyBlock}>
                <Text>{currentPace}</Text>
                <Text>페이스</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

export default ResultScreen;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  button: {
    width: 32,
    height: 32,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 24,
    top: 24,
  },
  upperBlock: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    top: 0,
    zIndex: 10,
    paddingTop: 24,
  },
  whiteBlock: {
    width: '100%',
    height: 170,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    position: 'absolute',
    bottom: 30,
    zIndex: 10,
  },
  greyBlock: {
    backgroundColor: '#F3F6FB',
    width: '30%',
    height: 68,
    borderRadius: 16,
  },
});
