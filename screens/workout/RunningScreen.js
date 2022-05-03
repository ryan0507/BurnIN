import React, {useState, useRef, useCallback, useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {hasPermission} from '../../modules/LocationPermission';
import Geolocation from 'react-native-geolocation-service';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useInterval} from 'react-use';
import moment from 'moment';
import {
  calCalories,
  calDistance,
  calPace,
  pacePresentation,
} from '../../modules/Calculations';
import CircularBtn from '../../components/CircularBtn';
import Icon from 'react-native-vector-icons/MaterialIcons';

function RunningScreen({route}) {
  const navigation = useNavigation();
  const watchId = useRef(null);
  const currentLat = useRef(route.params.lat);
  const currentLon = useRef(route.params.lon);
  const [currentPace, setCurrentPace] = useState('-\'--"');
  const [calories, setCalories] = useState(0);
  const [totalDist, setTotalDist] = useState(0);
  const [time, setTime] = useState(moment.duration(0, 'seconds'));
  const [focus, setFocus] = useState(true);

  const tick = () => {
    setTime(prevTime => prevTime.clone().add(1, 'seconds'));
  };

  const timer = useInterval(() => {
    if (focus) {
      tick();
    }
  }, 1000);

  if (!focus) {
    clearInterval(timer);
  }

  useEffect(() => {
    setFocus(true);
    if (focus === true && watchId.current == null) {
      getLocationUpdates();
    }

    return () => {
      setFocus(false);
      removeLocationUpdates();
    };
  }, [focus, getLocationUpdates]);

  const updatelocation = useInterval(() => {
    if (focus) {
      getLocationUpdates();
    }
  }, 30000);

  if (!focus) {
    clearInterval(updatelocation);
  }

  const getLocationUpdates = useCallback(async () => {
    const LocationPermission = await hasPermission();
    if (!LocationPermission) {
      return;
    }
    watchId.current = Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        let newLat = position.coords.latitude;
        let newLon = position.coords.longitude;
        let newDist = calDistance(
          currentLat.current,
          currentLon.current,
          newLat,
          newLon,
        );
        setTotalDist(prevDist => parseFloat(prevDist) + parseFloat(newDist));
        setCurrentPace(pacePresentation(calPace(newDist, 30)));
        setCalories(
          prevCal => parseFloat(prevCal) + calCalories(52, time.asSeconds()),
        );
      },
      error => {
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  }, [time]);
  const removeLocationUpdates = () => {
    console.log('remove location listener');

    Geolocation.clearWatch(watchId.current);
    watchId.current = null;
  };

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
              {`${time.hours() < 10 ? `0${time.hours()}` : time.hours()}:${
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
            {totalDist.toFixed(1)}
          </Text>
          <Text style={[styles.recordText, styles.medium]}>킬로미터</Text>
        </View>
        <CircularBtn
          onPress={() => {
            navigation.navigate('PauseScreen', time);
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
