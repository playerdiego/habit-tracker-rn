import React from 'react';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';

import HabitsScreen from '../screens/home/Habits/HabitsScreen';
import AddHabitScreen from '../screens/home/Habits/AddHabitScreen';
import { globalColors } from '../styles/global';

type HabitsStackParamList = {
    setup: undefined,
    add: undefined | {},
}

const Stack = createStackNavigator<HabitsStackParamList>();
export type HabitsNavigationProps = StackNavigationProp<HabitsStackParamList>;

export default function HabitsNavigation() {
  return (
    <Stack.Navigator
        initialRouteName='setup'
        screenOptions={{
        cardStyle: {backgroundColor: globalColors.background}
        }}
    >

        <Stack.Screen name='setup' component={HabitsScreen} options={{headerShown: false}} />
        <Stack.Screen name='add' component={AddHabitScreen} options={{headerShown: false}} />

    </Stack.Navigator>
  )
}