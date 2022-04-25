import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {hasPermission} from '../../modules/LocationPermission';
import Geolocation from 'react-native-geolocation-service';
import {useNavigation} from '@react-navigation/native';
import CircularBtn from '../../components/CircularBtn';

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
        timeout: 30000,
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
    <View style={styles.block}>
      <CircularBtn
        onPress={() => {
          navigation.navigate('RunStack', {
            screen: 'RunningScreen',
            params: {lat: lat.current, lon: lon.current},
          });
        }}>
        <Text style={styles.text}>시작</Text>
      </CircularBtn>
    </View>
  );
}

export default WorkOutScreen;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    fontSize: 24,
    color: '#ffffff',
  },
});
