import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useContext,
} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {hasPermission} from '../../modules/LocationPermission';
import Geolocation from 'react-native-geolocation-service';
import {useNavigation} from '@react-navigation/native';
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
import userStorages from '../../storages/userStorages';
import WorkOutContext from '../../contexts/WorkOutContext';

function RunningScreen({route}) {
  const navigation = useNavigation();
  const {dispatch, paces} = useContext(WorkOutContext);

  const watchId = useRef(null);
  const weight = useRef(0);

  const [lat, setLat] = useState(route.params.lat);
  const [lon, setLon] = useState(route.params.lon);
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

  const removeLocationUpdates = () => {
    console.log('removed geolocation');
    if (watchId.current != null) {
      Geolocation.clearWatch(watchId.current);
    }
  };

  const getLocationUpdates = () => {
    watchId.current = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const newLocation = {latitude: latitude, longitude: longitude};
        dispatch({type: 'UPDATE_LOCATION', payload: newLocation});

        const newDist = calDistance(lat, lon, latitude, longitude);
        setTotalDist(prevDist => parseFloat(prevDist) + parseFloat(newDist));
        setCalories(calCalories(weight.current, time));
        setCurrentPace(pacePresentation(calPace(totalDist, time)));

        setLat(latitude);
        setLon(longitude);
      },
      error => {
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
        },
        enableHighAccuracy: true,
      },
    );
  };

  useEffect(() => {
    userStorages.get().then(userInfo => {
      weight.current = userInfo.weight;
    });
    const newLocation = {
      latitude: route.params.lat,
      longitude: route.params.lon,
    };
    dispatch({type: 'UPDATE_LOCATION', payload: newLocation});
  }, []);

  useEffect(() => {
    return () => {
      removeLocationUpdates();
    };
  }, []);

  useEffect(() => {
    navigation.addListener('focus', e => {
      setFocus(true);
      getLocationUpdates();
    });
    navigation.addListener('blur', e => {
      setFocus(false);
      removeLocationUpdates();
    });
  }, [navigation]);

  useEffect(() => {
    console.log(paces);
    if (paces.length === 0 && totalDist >= 1) {
      dispatch({type: 'UPDATE_PACE', payload: time.asSeconds()});
    }
    if (paces.length === 1 && totalDist >= 2) {
      dispatch({type: 'UPDATE_PACE', payload: time.asSeconds()});
    }
    if (paces.length === 2 && totalDist >= 3) {
      dispatch({type: 'UPDATE_PACE', payload: time.asSeconds()});
    }
  }, [totalDist, dispatch, time, paces]);

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
            {totalDist.toFixed(2)}
          </Text>
          <Text style={[styles.recordText, styles.medium]}>킬로미터</Text>
        </View>
        <CircularBtn
          onPress={() => {
            navigation.navigate('PauseScreen', {
              time,
              totalDist,
              calories,
              currentPace,
            });
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
