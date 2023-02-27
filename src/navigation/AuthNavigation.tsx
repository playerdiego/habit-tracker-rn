import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import RecoverScreen from '../screens/auth/RecoverScreen';
import LauncherScreen from '../screens/auth/LauncherScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
    <Stack.Navigator initialRouteName='Launcher'>
        <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown: false}} />
        <Stack.Screen name='Recover' component={RecoverScreen} options={{headerShown: false}} />
        <Stack.Screen name='Launcher' component={LauncherScreen} options={{headerShown: false}} /> 
    </Stack.Navigator>
  )
}