import { View, Text } from 'react-native';
import React from 'react';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import CalendarScreen from '../screens/home/CalendarScreen';
import StreakScreen from '../screens/home/StreakScreen';
import AccountScren from '../screens/home/AccountScren';

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
      <Tabs.Screen name='home' component={HomeScreen} options={{headerShown: false}} />
      <Tabs.Screen name='calendar' component={CalendarScreen} />
      <Tabs.Screen name='streak' component={StreakScreen} />
      <Tabs.Screen name='account' component={AccountScren} />
    </Tabs.Navigator>
  )
}