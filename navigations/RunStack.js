import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RunningScreen from '../screens/workout/RunningScreen';
import PauseScreen from '../screens/workout/PauseScreen';
import ResultScreen from '../screens/workout/ResultScreen';

function RunStack() {
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    console.log('RunStack rendered');
    return () => {
      console.log('RunStack disappeared');
    };
  });

  return (
    <Stack.Navigator initialRouteName="RunningScreen">
      <Stack.Screen
        name="RunningScreen"
        component={RunningScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PauseScreen"
        component={PauseScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResultScreen"
        component={ResultScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default RunStack;
