import React, { useContext, useState, useEffect } from 'react';

import ScrollContainer from '../../components/ScrollContainer';
import StreakCalendar from '../../components/Streak/StreakCalendar';
import StreaksResume from '../../components/Streak/StreaksResume';
import StreakTotal from '../../components/Streak/StreakTotal';
import Divider from '../../components/Divider';
import { HabitsContext } from '../../context/HabitsContext';
import { View } from 'react-native';
import Title from '../../components/Title';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { HomeNavigationProps } from '../../navigation/HomeNavigation';

export default function StreakScreen() {

  const {habits} = useContext(HabitsContext);
  const {navigate} = useNavigation<HomeNavigationProps>();

  const [streaksExists, setStreaksExists] = useState(0);

  useEffect(() => {
    let tempStreakCount = 0;
    habits.map(habit => {
      tempStreakCount += habit.streak;
    });
    setStreaksExists(tempStreakCount);
  }, [habits]);

  return (
    <ScrollContainer title='Streaks'>
      {
        habits.length < 1 ?

        <View style={{marginVertical: 40}}>
          <Title size='sm' align='center'>There´s no habits! Create one</Title>
          <CustomButton text='Create or edit one' onPressed={() => navigate('habits')} style={{marginTop: 40}}/>
        </View> :

        <View>
          {
            streaksExists === 0 ?
            <View style={{marginVertical: 20}}>
              <Title size='xs'>You don´t have streks yet, start completeing habits!</Title>
            </View>
            : <StreaksResume />
          }
    
          <Divider />
    
          <StreakTotal />
    
          <Divider />
          
          <StreakCalendar />
        </View>
      }
    </ScrollContainer>
  )
}