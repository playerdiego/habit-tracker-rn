import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigation from './AuthNavigation';
import HomeNavigation from './HomeNavigation';
import { StackNavigationProp } from '@react-navigation/stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import { globalColors } from '../styles/global';

const Stack = createNativeStackNavigator();

export default function Navigation() {

  const auth = false;

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: globalColors.background },
      }}
    >
      {
        auth ? 
        <Stack.Screen name='Dashboard' component={HomeNavigation} options={{headerShown: false}} /> :
        <Stack.Screen name='Auth' component={AuthNavigation} options={{headerShown: false}} />
      }
    </Stack.Navigator>
  )
}