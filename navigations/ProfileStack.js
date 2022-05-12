import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileUpdateScreen from '../screens/profile/ProfileUpdateScreen';
function ProfileStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileUpdateScreen"
        component={ProfileUpdateScreen}
      />
    </Stack.Navigator>
  );
}

export default ProfileStack;
