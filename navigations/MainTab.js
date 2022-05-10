import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';
import WorkOutScreen from '../screens/main/WorkOutScreen';
import RaceScreen from '../screens/main/RaceScreen';
import DashboardScreen from '../screens/main/DashboardScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

function MainTab() {
  useEffect(() => {
    console.log('MainTab rendered');
    return () => {
      console.log('MainTab disappeared');
    };
  });

  return (
    <Tab.Navigator
      screenOptions={{
        showLabel: false,
      }}
      initialRouteName="WorkOut">
      <Tab.Screen
        name="Race"
        component={RaceScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="flag" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="WorkOut"
        component={WorkOutScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="directions-run" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="insights" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="face" size={size} color={color} />
          ),
          title: '프로필',
          headerStyle: {
            backgroundColor: '#f4bc68',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: '800',
            fontSize: 24,
          },
          headerTitleAlign: 'center',
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;
