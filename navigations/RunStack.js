import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RunningScreen from '../screens/run/RunningScreen';
import PauseScreen from '../screens/run/PauseScreen';

function RunStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="RunningScreen">
      <Stack.Screen
        name="RunningScreen"
        component={RunningScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="PauseScreen" component={PauseScreen} />
    </Stack.Navigator>
  );
}

export default RunStack;
