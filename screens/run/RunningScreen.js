import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {hasPermission} from '../../modules/LocationPermission';
import Geolocation from 'react-native-geolocation-service';
import Moment from 'react-moment';
import {useNavigation} from '@react-navigation/native';
import {calCalories, calDistance} from '../../modules/Calculations';
import CircularBtn from '../../components/CircularBtn';
import Icon from 'react-native-vector-icons/MaterialIcons';

function RunningScreen({route}) {
  const watchId = useRef(null);
  const realtime = useRef(0);
  const currentLat = useRef(route.params.lat);
  const currentLon = useRef(route.params.lon);
  const [currentPace, setCurrentPace] = useState('-\'--"');
  const [calories, setCalories] = useState('--');
  const [totalDist, setTotalDist] = useState(0.0);
  const [inFocus, setInFocus] = useState(true);

  const nowTime = Date.now();
  const navigation = useNavigation();

  const updateRealtime = time => {
    realtime.current = time;
  };

  const getLocationUpdates = async () => {
    const locationPermission = await hasPermission();
    if (!locationPermission) {
      return;
    }
    watchId.current = Geolocation.watchPosition(
      position => {
        console.log('position updated');
        console.log(position);
        // 30초 단위로

        // 페이스 업데이트
        // 소모 칼로리
        setCalories(calCalories(52, realtime.current)); // 나중에 실제 유저 몸무게로 업데이트 해줘야 함
        console.log(calories);
        // 거리 계산해서 업데이트
        const newLat = position.coords.latitude;
        const newLon = position.coords.longitude;
        setTotalDist(
          calDistance(currentLat.current, currentLon.current, newLat, newLon),
        );
        currentLat.current = newLat;
        currentLon.current = newLon;
        console.log(totalDist);
      },
      error => {
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
        },
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 10000,
        fastestInterval: 2000,
        forceRequestLocation: true,
        forceLocationManager: true,
      },
    );
  };

  useEffect(() => {
    console.log('runnignscreen rendered');
    return () => {
      console.log('runningscreen 끝');
      Geolocation.clearWatch(watchId.current);
    };
  }, []);

  useEffect(() => {
    navigation.addListener('focus', event => {
      setInFocus(true);
      getLocationUpdates();
    });
  });

  return (
    <>
      <StatusBar backgroundColor="#F4BC68" />
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
              <Moment
                element={Text}
                date={nowTime}
                durationFromNow
                interval={1000}
                onChange={val => {
                  updateRealtime(val);
                }}
              />
            </Text>
            <Text style={[styles.recordText, styles.small]}>시간</Text>
          </View>
          <View style={styles.recordItem}>
            <Text style={[styles.recordText, styles.medium]} />
            <Text style={[styles.recordText, styles.small]}>칼로리</Text>
          </View>
        </View>
        <View style={styles.distBlock}>
          <Text style={[styles.recordText, styles.large]}>{totalDist}</Text>
          <Text style={[styles.recordText, styles.medium]}>킬로미터</Text>
        </View>
        <CircularBtn
          onPress={() => {
            navigation.navigate('PauseScreen', {realtime});
          }}
          white
          wideMargin>
          <Icon name="pause" size={42} color="#EF9917" />
        </CircularBtn>
      </View>
    </>
  );
}

export default RunningScreen;

const styles = StyleSheet.create({
  block: {
    backgroundColor: '#F4BC68',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 48,
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
});
