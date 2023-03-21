import { View, Text, ScrollView } from 'react-native';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { global } from '../../styles/global';
import ScrollContainer from '../../components/ScrollContainer';
import StreakCalendar from '../../components/Streak/StreakCalendar';
import StreakFeed from '../../components/Streak/StreakFeed';
import StreaksResume from '../../components/Streak/StreaksResume';
import StreakTotal from '../../components/Streak/StreakTotal';
import Divider from '../../components/Divider';

export default function StreakScreen() {
  return (
    <ScrollContainer title='Streaks'>
      <StreaksResume />

      <Divider />

      <StreakTotal />

      <Divider />
      
      <StreakCalendar />
    </ScrollContainer>
  )
}