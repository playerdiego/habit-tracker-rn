import { View, Text } from 'react-native';
import React from 'react';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import StreakScreen from '../screens/home/StreakScreen';
import AccountScren from '../screens/home/Account/AccountScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AccountNavigation from './AccountNavigation';
import { globalColors } from '../styles/global';
import { FloatingAction } from 'react-native-floating-action';
import HabitsNavigation from './HabitsNavigation';

type HomeTabParaList = {
  home: undefined,
  habits: undefined,
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
        backgroundColor: globalColors.background
      }}
    >
      <Tabs.Screen 
        name='home'
        component={HomeScreen}
        options={{
          headerShown: false,
          title: 'Home',
          tabBarActiveTintColor: globalColors.primary,
          tabBarIcon: ({color, size}) => (
            <Icon name='home' color={color} size={size} />
          )
        }} 
        
      />

      <Tabs.Screen 
        name='habits' 
        component={HabitsNavigation} 
        options={{
          headerShown: false,
          title: 'Habits Config',
          tabBarActiveTintColor: globalColors.primary,
          tabBarIcon: ({color, size}) => (
            <Icon name='th-list' color={color} size={size} />
          )
        }} 
      />


      <Tabs.Screen 
        name='streak' 
        component={StreakScreen} 
        options={{
          headerShown: false,
          title: 'Streaks',
          tabBarActiveTintColor: globalColors.primary,
          tabBarIcon: ({color, size}) => (
            <Icon name='fire' color={color} size={size} />
          )
        }} 
      />

      <Tabs.Screen 
        name='account' 
        component={AccountNavigation} 
        options={{
          headerShown: false,
          title: 'Account',
          tabBarActiveTintColor: globalColors.primary,
          tabBarIcon: ({color, size}) => (
            <Icon name='user' color={color} size={size} />
          )
        }} 
      />


    </Tabs.Navigator>
  )
}