import { View, Text } from 'react-native'
import React from 'react'
import ScrollContainer from '../../../components/ScrollContainer'
import CustomButton from '../../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { HabitsNavigationProps } from '../../../navigation/HabitsNavigation';

export default function HabitsScreen() {

  const {navigate} = useNavigation<HabitsNavigationProps>();

  return (
    <ScrollContainer title='Habits Configuration' titleSize='md'>

      <CustomButton text='Add new Habit' onPressed={() => {navigate('add')}} outline={true} />

    </ScrollContainer>
  )
}