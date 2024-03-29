import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/login/LoginScreen';
import SignUpStack from '../screens/signUp/SignUpStack';
import MainTab from './MainTab';
import RunStack from './RunStack';
import {SignUpContextProvider} from '../contexts/SignUpContext';
import {WorkOutContextProvider} from '../contexts/WorkOutContext';

function RootStack() {
  const Stack = createNativeStackNavigator();

  return (
    <SignUpContextProvider>
      <WorkOutContextProvider>
        <Stack.Navigator initialRouteName="Landing">
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
            options={{
              title: '회원가입',
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: '#EF9917',
              },
              headerTitleAlign: 'center',
              headerTintColor: '#ffffff',
              headerTitleStyle: {
                fontWeight: '600',
                fontSize: 24,
              },
            }}
          />
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RunStack"
            component={RunStack}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </WorkOutContextProvider>
    </SignUpContextProvider>
  );
}

export default RootStack;
