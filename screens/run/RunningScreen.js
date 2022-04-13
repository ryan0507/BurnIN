import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {hasPermission} from '../../modules/LocationPermission';
import Geolocation from 'react-native-geolocation-service';
import Moment from 'react-moment';
import {useNavigation} from '@react-navigation/native';

function RunningScreen() {
  const realtime = useRef(0);
  const [currentPace, setCurrentPace] = useState('-\'--"');
  const [calories, setCalories] = useState('--');
  const [distance, setDistance] = useState(0);

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
    Geolocation.watchPosition(
      position => {
        console.log(position);
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
        interval: 30000,
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
        <Text>{distance}킬로미터</Text>
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
