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
import { UIContext } from '../../context/UIContext';

export default function StreakScreen() {

  const {habits} = useContext(HabitsContext);
  const {navigate} = useNavigation<HomeNavigationProps>();
  const {i18n} = useContext(UIContext);

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
          <Title size='sm' align='center'>{i18n.t('theresNoHabits')}</Title>
          <CustomButton text={i18n.t('createOrEdit')} onPressed={() => navigate('habits')} style={{marginTop: 40}}/>
        </View> :

        <View>
          {
            streaksExists === 0 ?
            <View style={{marginVertical: 20}}>
              <Title size='xs'>{i18n.t('noStreaks')}</Title>
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