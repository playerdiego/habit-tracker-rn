import React, { useContext, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth/react-native';

import AuthNavigation from './AuthNavigation';
import HomeNavigation from './HomeNavigation';
import { globalColors } from '../styles/global';
import { AuthContext } from '../context/AuthContext';
import LoadingScreen from '../screens/auth/LoadingScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const {user, setUser} = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  onAuthStateChanged(auth, (userAuth) => {
    if(userAuth) {
      setUser(userAuth);
    } else {
      setUser(null);
    }
    setLoading(false);
  });

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: globalColors.background },
      }}
    >
      {
        loading ?
        <Stack.Screen name='loading' component={LoadingScreen} options={{headerShown: false}} /> :
        user ? 
        <Stack.Screen name='Dashboard' component={HomeNavigation} options={{headerShown: false}} /> :
        <Stack.Screen name='Auth' component={AuthNavigation} options={{headerShown: false}} />
      }
    </Stack.Navigator>
  )
}