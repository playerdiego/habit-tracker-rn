import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigation from './AuthNavigation';
import HomeNavigation from './HomeNavigation';
import { StackNavigationProp } from '@react-navigation/stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import { globalColors } from '../styles/global';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

const Stack = createNativeStackNavigator();

export default function Navigation() {

  const [user, setUser] = useState<User | null>(null);

  const auth = getAuth();
  onAuthStateChanged(auth, (userAuth) => {
    setUser(userAuth);
  });

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: globalColors.background },
      }}
    >
      {
        user ? 
        <Stack.Screen name='Dashboard' component={HomeNavigation} options={{headerShown: false}} /> :
        <Stack.Screen name='Auth' component={AuthNavigation} options={{headerShown: false}} />
      }
    </Stack.Navigator>
  )
}