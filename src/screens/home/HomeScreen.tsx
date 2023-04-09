import { View, Text } from 'react-native';
import React, { useContext } from 'react';

import { global } from '../../styles/global';
import StreakAlert from '../../components/Streak/StreakAlert';
import { Habit } from '../../interfaces/habit.interface';
import HabitCheckbox from '../../components/HabitCheckbox';
import Divider from '../../components/Divider';
import ScrollContainer from '../../components/ScrollContainer';
import { AuthContext } from '../../context/AuthContext';
import ValidateEmailAlert from '../../components/ValidateEmailAlert';
import { HabitsContext } from '../../context/HabitsContext';

export default function HomeScreen() {

  const {user} = useContext(AuthContext);
  const {todayHabits} = useContext(HabitsContext);

  return (
    <ScrollContainer title={'Good Morning, ' + user?.displayName} titleSize='md'> 

        <View style={{marginBottom: 15}}>

          {!user?.emailVerified && <ValidateEmailAlert />}

          <Text style={global.boldTitle}>Today´s Habits - {todayHabits.filter(habit => !habit.completed).length} left</Text>

          {
            todayHabits.map((habit, id) => (
              !habit.completed &&
              <HabitCheckbox key={id} habit={habit}  />
            ))
          }


        </View>

        <Divider />

        <View style={{marginTop: 25, marginBottom: 15}}>
          <Text style={global.boldTitle}>Completed Habits: {todayHabits.filter(habit => habit.completed).length}</Text>

          {
            todayHabits.map(habit => (
              habit.completed &&
              <HabitCheckbox key={habit.title} habit={habit}  />
            ))
          }


        </View>


        <View style={{marginBottom: 30}}><StreakAlert></StreakAlert></View>
        
    </ScrollContainer>
  )
}

