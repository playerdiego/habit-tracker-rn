import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigation from './AuthNavigation';
import DashboardNavigation from './DashboardNavigation';

const Stack = createNativeStackNavigator();

export default function Navigation() {

  const auth = false;

  return (
    <Stack.Navigator>
      {
        auth ? 
        <Stack.Screen name='Dashboard' component={DashboardNavigation} options={{headerShown: false}} /> :
        <Stack.Screen name='Auth' component={AuthNavigation} options={{headerShown: false}} />
      }
    </Stack.Navigator>
  )
}