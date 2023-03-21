import { View, Text } from 'react-native'
import React from 'react'
import ScrollContainer from '../../../components/ScrollContainer'
import CustomBackButton from '../../../components/CustomBackButton'
import { HabitsNavigationProps } from '../../../navigation/HabitsNavigation';
import { useNavigation } from '@react-navigation/native';

export default function AddHabitScreen() {

  const {navigate} = useNavigation<HabitsNavigationProps>();

  return (
    <ScrollContainer title='Add Habit'>
      <CustomBackButton onPressed={() => {navigate('habits')}} />

      
    </ScrollContainer>
  )
}