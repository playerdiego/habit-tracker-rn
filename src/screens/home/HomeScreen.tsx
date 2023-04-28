import { View, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import { global } from '../../styles/global';
import StreakAlert from '../../components/Streak/StreakAlert';
import HabitCheckbox from '../../components/HabitCheckbox';
import Divider from '../../components/Divider';
import ScrollContainer from '../../components/ScrollContainer';
import { AuthContext } from '../../context/AuthContext';
import ValidateEmailAlert from '../../components/ValidateEmailAlert';
import { HabitsContext } from '../../context/HabitsContext';
import ReactText from '../../components/ReactText';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { HomeNavigationProps } from '../../navigation/HomeNavigation';
import Title from '../../components/Title';
import { UIContext } from '../../context/UIContext';

export default function HomeScreen() {

  const {navigate} = useNavigation<HomeNavigationProps>();

  const {user} = useContext(AuthContext);
  const {todayHabits, habits} = useContext(HabitsContext);
  const {i18n} = useContext(UIContext);

  const completedHabitsLength = todayHabits.filter(habit => habit.completed).length;
  const incompletedHabitsLength = todayHabits.filter(habit => !habit.completed).length;

  const [streaksExists, setStreaksExists] = useState(0);

  useEffect(() => {
    let tempStreakCount = 0;
    habits.map(habit => {
      tempStreakCount += habit.streak;
    });
    setStreaksExists(tempStreakCount);
  }, [habits]);

  return (
    <ScrollContainer title={i18n.t('hello') + user?.displayName} titleSize='md'> 

        <View style={{marginBottom: 15}}>

          {!user?.emailVerified && <ValidateEmailAlert />}

          {
            //Checks if exists habits for the current day
            todayHabits.length < 1 ?
            // If there´s no, show an alert
            <View style={{marginVertical: 40}}>
              <Title size='sm' align='center'>{i18n.t('noHabits')}</Title>
              <CustomButton text={i18n.t('createOrEdit')} onPressed={() => navigate('habits')} style={{marginTop: 40}}/>
            </View> :

            // If exists habits, render the tracker
            <View>
              <View style={{marginVertical: 20}}>
                <Text style={{...global.boldTitle, marginBottom: 10}}>{i18n.t('todaysHabits')}{incompletedHabitsLength}{i18n.t('left')}</Text>
                {
                  //Checks if theres incompleted habits
                  incompletedHabitsLength < 1 &&
                    <ReactText style={{marginVertical: 20}}>{i18n.t('completedAll')}</ReactText>
                }

                {
                  todayHabits.map((habit, i) => (
                    !habit.completed &&
                    <HabitCheckbox key={i} habit={habit}  />
                  ))
                }
              </View>

              <Divider />

              <View style={{marginVertical: 20}}>
                <Text style={{...global.boldTitle, marginBottom: 10}}>{i18n.t('completedHabits')}{completedHabitsLength}</Text>

                {
                  //Checks if theres completed habits
                  completedHabitsLength < 1 &&
                    <ReactText style={{marginVertical: 20}}>{i18n.t('youHavent')}</ReactText>
                }

                {
                  todayHabits.map((habit, i) => (
                    habit.completed &&
                    <HabitCheckbox key={i} habit={habit}  />
                  ))
                }
              </View>

            </View>
            

          }
        </View>

          <View style={{marginBottom: 30}}>
            {
              streaksExists > 0 && 
              <StreakAlert></StreakAlert>
            }
          </View>

    </ScrollContainer>
  )
}

