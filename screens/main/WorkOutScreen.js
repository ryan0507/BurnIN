import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {hasPermission} from '../../modules/LocationPermission';
import Geolocation from 'react-native-geolocation-service';
import {useNavigation} from '@react-navigation/native';

function WorkOutScreen() {
  const navigation = useNavigation();
  const getLocation = async () => {
    const locationPermission = await hasPermission();
    if (!locationPermission) {
      return;
    }
    Geolocation.getCurrentPosition(
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
          navigation.navigate('RunStack');
        }}
      />
    </View>
  );
}

export default WorkOutScreen;
