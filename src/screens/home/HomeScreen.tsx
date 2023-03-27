import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Title from '../../components/Title';
import { global } from '../../styles/global';
import StreakAlert from '../../components/Streak/StreakAlert';
import { Habit } from '../../interfaces/habit.interface';
import HabitCheckbox from '../../components/HabitCheckbox';
import Divider from '../../components/Divider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ScrollContainer from '../../components/ScrollContainer';
import { FloatingAction } from 'react-native-floating-action';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ValidateEmailAlert from '../../components/validateEmailAlert';

const habits: Habit[] = [
  {
    title: 'Entrenar',
    description: 'Entrenamiento de pecho',
    completed: false
  },
  {
    title: 'Estudiar',
    description: 'Matemáticas',
    completed: false
  },
  {
    title: 'Leer',
    description: 'Mistborn',
    completed: false
  },
  {
    title: 'Programar',
    description: 'Aplicación',
    completed: true
  },
  {
    title: 'Meditar',
    description: '10 min',
    completed: true
  },
];

export default function HomeScreen() {

  const {user} = useContext(AuthContext);

  return (
    <ScrollContainer title={'Good Morning, ' + user?.displayName} titleSize='md'> 

        <View style={{marginBottom: 15}}>

          {!user?.emailVerified && <ValidateEmailAlert />}

          <Text style={global.boldTitle}>Today´s Habits - 3 left</Text>

          {
            habits.map(habit => (
              !habit.completed &&
              <HabitCheckbox key={habit.title} habit={habit}  />
            ))
          }


        </View>

        <Divider />

        <View style={{marginTop: 25, marginBottom: 15}}>
          <Text style={global.boldTitle}>Completed Habits: 2</Text>

          {
            habits.map(habit => (
              habit.completed &&
              <HabitCheckbox key={habit.title} habit={habit}  />
            ))
          }


        </View>


        <View style={{marginBottom: 30}}><StreakAlert></StreakAlert></View>
        
    </ScrollContainer>
  )
}

