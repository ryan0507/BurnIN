import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {hasPermission} from '../../modules/LocationPermission';
import Geolocation from 'react-native-geolocation-service';
import Moment from 'react-moment';
import {useNavigation} from '@react-navigation/native';
import {calCalories, calDistance} from '../../modules/Calculations';

function RunningScreen({route}) {
  const watchId = useRef(null);
  const realtime = useRef(0);
  const currentLat = useRef(route.params.lat);
  const currentLon = useRef(route.params.lon);
  const [currentPace, setCurrentPace] = useState('-\'--"');
  const [calories, setCalories] = useState('--');
  const [totalDist, setTotalDist] = useState(0);

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
        interval: 1000,
        fastestInterval: 2000,
        forceRequestLocation: true,
        forceLocationManager: true,
      },
    );
  };

  useEffect(() => {
    getLocationUpdates();
  });

  return (
    <View>
      <View>
        <View>
          <Text>{currentPace}페이스</Text>
        </View>
        <View>
          <Text>
            <Moment
              element={Text}
              date={nowTime}
              durationFromNow
              interval={1000}
              onChange={val => {
                updateRealtime(val);
              }}
            />
            시간
          </Text>
        </View>
        <View>
          <Text>{calories}칼로리</Text>
        </View>
      </View>
      <View>
        <Text>{totalDist}킬로미터</Text>
      </View>
      <Button
        title="pause"
        onPress={() => {
          navigation.navigate('PauseScreen', {realtime});
        }}
      />
    </View>
  );
}

export default RunningScreen;
