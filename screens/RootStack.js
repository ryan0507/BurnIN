import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from './LandingScreen';
import SignUpStack from './signUp/SignUpStack';
import MainTab from './main/MainTab';
import LoginScreen from './login/LoginScreen';

function RootStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Main"
        component={MainTab}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
