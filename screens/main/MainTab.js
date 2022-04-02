import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import WorkOutScreen from './WorkOutScreen';
import RaceScreen from './RaceScreen';
import DashboardScreen from './DashboardScreen';
import ProfileScreen from './ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        showLabel: false,
      }}>
      <Tab.Screen
        name="WorkOut"
        component={WorkOutScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="directions-run" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Race"
        component={RaceScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="flag" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
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
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;
