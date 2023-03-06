import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import RecoverScreen from '../screens/auth/RecoverScreen';
import LauncherScreen from '../screens/auth/LauncherScreen';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from "react-native-vector-icons/FontAwesome5";

type AuthStackParamList = {
  login: undefined,
  register: undefined,
  recover: undefined,
  launcher: undefined,
}

const Stack = createNativeStackNavigator<AuthStackParamList>();
export type AuthNavigationProps = StackNavigationProp<AuthStackParamList>


export default function AuthNavigation() {

  const {goBack, navigate} = useNavigation<AuthNavigationProps>();

  return (
    <Stack.Navigator 
      initialRouteName='launcher' 
      screenOptions={{
        contentStyle: { backgroundColor: '#fff' },
        headerLeft: ({canGoBack}) =>
          <TouchableOpacity>
            <Icon name='arrow-left' onPress={() => canGoBack ? goBack() : navigate('launcher')} />
          </TouchableOpacity>
      
      }}>
        <Stack.Screen name='login' component={LoginScreen} options={{headerShadowVisible: false, headerTitle: ''}} />
        <Stack.Screen name='register' component={RegisterScreen} options={{headerShadowVisible: false, headerTitle: ''}} />
        <Stack.Screen name='recover' component={RecoverScreen} options={{headerShadowVisible: false, headerTitle: ''}} />
        <Stack.Screen name='launcher' component={LauncherScreen} options={{headerShown: false}} /> 
    </Stack.Navigator>
  )
}