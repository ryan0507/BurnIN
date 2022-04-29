import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileUpdateScreen from '../screens/profile/ProfileUpdateScreen';
import AnnouncementScreen from '../screens/profile/AnnouncementScreen';
import EventScreen from '../screens/profile/EventScreen';
import SettingScreen from '../screens/profile/SettingScreen';

function ProfileStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileUpdateScreen"
        component={ProfileUpdateScreen}
      />
      <Stack.Screen name="AnnouncementScreen" component={AnnouncementScreen} />
      <Stack.Screen name="EventScreen" component={EventScreen} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
    </Stack.Navigator>
  );
}

export default ProfileStack;
