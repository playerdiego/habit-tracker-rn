import React from 'react';

import ScrollContainer from '../../components/ScrollContainer';
import StreakCalendar from '../../components/Streak/StreakCalendar';
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