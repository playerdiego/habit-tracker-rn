import { View, Text } from 'react-native';
import React from 'react';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import CalendarScreen from '../screens/home/CalendarScreen';
import StreakScreen from '../screens/home/StreakScreen';
import AccountScren from '../screens/home/AccountScren';
import Icon from 'react-native-vector-icons/FontAwesome5';

type HomeTabParaList = {
  home: undefined,
  calendar: undefined,
  streak: undefined,
  account: undefined,
}

const Tabs = createBottomTabNavigator<HomeTabParaList>();
export type HomeNavigationProps = BottomTabNavigationProp<HomeTabParaList>;

export default function HomeNavigation() {
  return (
    <Tabs.Navigator
      initialRouteName='home'
      sceneContainerStyle={{
        backgroundColor: '#fff'
      }}
    >
      <Tabs.Screen 
        name='home'
        component={HomeScreen}
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name='home' color={color} size={size} />
          )
        }} 
        
      />

      {/* <Tabs.Screen 
        name='calendar' 
        component={CalendarScreen}options={{
          headerShown: false,
          title: 'Calendar',
          tabBarIcon: ({color, size}) => (
            <Icon name='calendar' color={color} size={size} />
          )
        }} 
      /> */}

      <Tabs.Screen 
        name='streak' 
        component={StreakScreen} 
        options={{
          headerShown: false,
          title: 'Streaks',
          tabBarIcon: ({color, size}) => (
            <Icon name='fire' color={color} size={size} />
          )
        }} 
      />

      <Tabs.Screen 
        name='account' 
        component={AccountScren} 
        options={{
          headerShown: false,
          title: 'Account',
          tabBarIcon: ({color, size}) => (
            <Icon name='user' color={color} size={size} />
          )
        }} 
      />

    </Tabs.Navigator>
  )
}