import React from 'react';
import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

import AuthNavigation from './AuthNavigation';
import HomeNavigation from './HomeNavigation';
import { globalColors } from '../styles/global';

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