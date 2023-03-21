import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import AccountScren from '../screens/home/Account/AccountScreen';
import EditAccountScreen from '../screens/home/Account/EditAccountScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import ChangePasswordScreen from '../screens/home/Account/ChangePasswordScreen';
import { globalColors } from '../styles/global';

type AccountStackParamList = {
  data: undefined,
  edit: undefined,
  password: undefined,
}

const Stack = createStackNavigator<AccountStackParamList>();
export type AccountNavigationProps = StackNavigationProp<AccountStackParamList>;

export default function AccountNavigation() {

  return (
    <Stack.Navigator 
      initialRouteName='data'
      screenOptions={{
        cardStyle: {backgroundColor: globalColors.background}
      }}
    >
        <Stack.Screen name='data' component={AccountScren} options={{headerShown: false}} />
        <Stack.Screen name='edit' component={EditAccountScreen} options={{headerShown: false}} />
        <Stack.Screen name='password' component={ChangePasswordScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}