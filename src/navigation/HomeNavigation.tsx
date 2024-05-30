import React, { useContext } from 'react';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from '../screens/home/HomeScreen';
import StreakScreen from '../screens/home/StreakScreen';
import AccountNavigation from './AccountNavigation';
import { globalColors } from '../styles/global';
import HabitsNavigation from './HabitsNavigation';
import { Text } from 'react-native';
import { UIContext } from '../context/UIContext';

type HomeTabParamList = {
  home: undefined,
  habits: undefined,
  streak: undefined,
  account: undefined,
}

const Tabs = createBottomTabNavigator<HomeTabParamList>();
export type HomeNavigationProps = BottomTabNavigationProp<HomeTabParamList>;

export default function HomeNavigation() {

  const {i18n} = useContext(UIContext);

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
          title: i18n.t('home'),
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
          title: i18n.t('habits'),
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
          title: i18n.t('streaks'),
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
          title: i18n.t('account'),
          tabBarActiveTintColor: globalColors.primary,
          tabBarIcon: ({color, size}) => (
            <Icon name='user' color={color} size={size} />
          )
        }} 
      />


    </Tabs.Navigator>
  )
}