import { View, Text, ScrollView } from 'react-native';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Title from '../../components/Title';
import { global } from '../../styles/global';
import StreakAlert from '../../components/StreakAlert';
import { Habit } from '../../interfaces/habit.interface';
import HabitCheckbox from '../../components/HabitCheckbox';

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
  return (
    <SafeAreaView>
      <ScrollView style={global.container}>
        <Title size='md'>Good Morning! Diego</Title>

        <View style={{marginTop: 25, marginBottom: 15}}>
          <Text style={global.boldTitle}>Tus hábitos de hoy - Te faltan 4</Text>

          {
            habits.map(habit => (
              !habit.completed &&
              <HabitCheckbox title={habit.title} description={habit.description} completed={habit.completed}  />
            ))
          }


        </View>



        <StreakAlert></StreakAlert>
      </ScrollView>
    </SafeAreaView>
  )
}

