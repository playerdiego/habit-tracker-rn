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

export default function HomeScreen() {

  const {navigate} = useNavigation<HomeNavigationProps>();

  const {user} = useContext(AuthContext);
  const {todayHabits, habits} = useContext(HabitsContext);

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
    <ScrollContainer title={'Good Morning, ' + user?.displayName} titleSize='md'> 

        <View style={{marginBottom: 15}}>

          {!user?.emailVerified && <ValidateEmailAlert />}

          {
            // Verifica si existen hábitos para el día actual
            todayHabits.length < 1 ?
            // Si no hay hábitos muestra un mensaje de advertencia con un botón para editar o añadir un hábitos
            <View style={{marginVertical: 40}}>
              <Title size='sm' align='center'>There´s no habits for today!</Title>
              <CustomButton text='Create or edit one' onPressed={() => navigate('habits')} style={{marginTop: 40}}/>
            </View> :

            // Si existen hábitos rederiza el tracker/registro diario
            <View>
              <View style={{marginVertical: 20}}>
                <Text style={{...global.boldTitle, marginBottom: 10}}>Today´s Habits - {incompletedHabitsLength} left</Text>
                {
                  //Verifica si hay hábitos incompletos, si no hay, muestra un mensaje
                  incompletedHabitsLength < 1 &&
                    <ReactText style={{marginVertical: 20}}>You have completed all your daily habits! Congratulations</ReactText>
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
                <Text style={{...global.boldTitle, marginBottom: 10}}>Completed Habits: {completedHabitsLength}</Text>

                {
                  //Verifica si hay hábitos completos, si no hay, muestra un mensaje
                  completedHabitsLength < 1 &&
                    <ReactText style={{marginVertical: 20}}>You haven´t completed any habit today :(</ReactText>
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

