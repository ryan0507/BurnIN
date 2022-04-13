import React, {useEffect, useRef} from 'react';
import {View, Text, Button} from 'react-native';
import {hasPermission} from '../../modules/LocationPermission';
import Geolocation from 'react-native-geolocation-service';
import {useNavigation} from '@react-navigation/native';

function WorkOutScreen() {
  const navigation = useNavigation();
  const lat = useRef(0);
  const lon = useRef(0);

  const getLocation = async () => {
    const locationPermission = await hasPermission();
    if (!locationPermission) {
      return;
    }
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        lat.current = position.coords.latitude;
        lon.current = position.coords.longitude;
      },
      error => {
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
        },
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        forceLocationManager: false,
        showLocationDialog: true,
      },
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View>
      <Text>WorkOut</Text>
      <Button
        title="run"
        onPress={() => {
          navigation.navigate('RunStack', {
            screen: 'RunningScreen',
            params: {lat: lat.current, lon: lon.current},
          });
        }}
      />
    </View>
  );
}

export default WorkOutScreen;
