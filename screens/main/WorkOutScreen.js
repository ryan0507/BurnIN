import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {hasPermission} from '../../modules/LocationPermission';
import Geolocation from 'react-native-geolocation-service';
import {useNavigation} from '@react-navigation/native';
import CircularBtn from '../../components/CircularBtn';
import MapView from 'react-native-maps';

function WorkOutScreen() {
  const navigation = useNavigation();
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const getLocation = async () => {
    const locationPermission = await hasPermission();
    if (!locationPermission) {
      return;
    }
    Geolocation.getCurrentPosition(
      position => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
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
      <MapView
        initialRegion={{
          latitude: 37.56578,
          longitude: 126.9386,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={{
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
      />
      <CircularBtn
        onPress={() => {
          navigation.navigate('RunStack', {
            screen: 'RunningScreen',
            params: {lat, lon},
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
    position: 'relative',
  },
  text: {
    fontWeight: '600',
    fontSize: 24,
    color: '#ffffff',
  },
  map: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
