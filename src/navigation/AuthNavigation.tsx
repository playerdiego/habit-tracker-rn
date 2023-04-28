import { TouchableOpacity } from 'react-native';
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome5";

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import RecoverScreen from '../screens/auth/RecoverScreen';
import LauncherScreen from '../screens/auth/LauncherScreen';
import { globalColors } from '../styles/global';
import LoadingScreen from '../screens/auth/LoadingScreen';

type AuthStackParamList = {
  login: undefined,
  register: undefined,
  recover: undefined,
  launcher: undefined,
  loading: undefined,
}

const Stack = createNativeStackNavigator<AuthStackParamList>();
export type AuthNavigationProps = StackNavigationProp<AuthStackParamList>


export default function AuthNavigation() {

  const {goBack, navigate} = useNavigation<AuthNavigationProps>();

  return (
    <Stack.Navigator 
      initialRouteName='launcher'
      
      screenOptions={{
        contentStyle: { backgroundColor: globalColors.background },
        headerLeft: ({canGoBack}) =>
          <TouchableOpacity>
            <Icon name='arrow-left' onPress={() => canGoBack ? goBack() : navigate('launcher')} />
          </TouchableOpacity>
      }}>
        <Stack.Screen name='login' component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name='register' component={RegisterScreen} options={{headerShown: false}} />
        <Stack.Screen name='recover' component={RecoverScreen} options={{headerShown: false}} />
        <Stack.Screen name='launcher' component={LauncherScreen} options={{headerShown: false}} /> 
    </Stack.Navigator>
  )
}