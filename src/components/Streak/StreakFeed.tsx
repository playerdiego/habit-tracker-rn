import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ScrollContainer from '../ScrollContainer';
import Divider from '../Divider';
import Title from '../Title';
import { Habit } from '../../interfaces/habit.interface';
import { global } from '../../styles/global';
import HabitCheckbox from '../HabitCheckbox';

interface HistoryItem {
  date: string,
  habits: Habit[]
}

const FeedHistory: HistoryItem[] = [
  {
    date: 'Tuesday 21/03/2023',
    habits: [
      {
        title: 'Entrenar',
        description: 'Entrenamiento de pecho',
        completed: true
      },
      {
        title: 'Estudiar',
        description: 'Matemáticas',
        completed: true
      },
      {
        title: 'Leer',
        description: 'Mistborn',
        completed: true
      },
      {
        title: 'Programar',
        description: 'Aplicación',
        completed: true
      },
      {
        title: 'Meditar',
        description: '10 min',
        completed: false
      },
    ]
  },
  {
    date: 'Monday 20/03/2023',
    habits: [
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
    ]
  },
  
]


export default function StreakFeed() {
  return (
    <View style={{marginTop: 20}}>
      <Title size='sm'>Habits History</Title>

      {
        FeedHistory.map(({date, habits}) => (
          <ItemFeed date={date} habits={habits} key={date} />
        ))
      }
    </View>
  )
}

function ItemFeed({date, habits}: HistoryItem) {
  return (
    <View style={{marginVertical: 20}}>
      <Text style={global.boldTitle}>{date}</Text>

     <View style={styles.habitsGrid}>
      <View style={styles.habitsGridItem}>
          {
            habits.map(habit => (
              habit.completed &&
              <HabitCheckbox
                key={habit.title}
                habit={habit} size='sm' history={true}  />
            ))
          }
        </View>
        <View style={styles.habitsGridItem}>
          {
            habits.map(habit => (
              !habit.completed &&
              <HabitCheckbox
                key={habit.title}
                habit={habit} size='sm' history={true}  />
            ))
          }
        </View>
     </View>

    </View>
  )
}

const styles = StyleSheet.create({
  streakText: {
    fontWeight: 'bold',
    fontSize: 18
  },
  habitsGrid: {
    flexDirection: 'row',
  },
  habitsGridItem: {
    width: '50%',
    flexGrow: 1
  }
})