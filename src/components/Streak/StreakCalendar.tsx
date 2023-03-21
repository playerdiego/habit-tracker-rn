import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Title from '../Title'
import {Calendar} from 'react-native-calendars';
import { useFonts } from 'expo-font';
import { Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { global, globalColors } from '../../styles/global';
import { Habit } from '../../interfaces/habit.interface';
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

export default function StreakCalendar() {

  const [fontLoaded] = useFonts({
      Comfortaa_400Regular,
  });

if(!fontLoaded) return null;

  return (
    <View style={{marginVertical: 20}}>
      <Title size='sm'>Calendar</Title>

      <Calendar
        theme={{
          arrowColor: '#000',
          textDayFontFamily: 'Comfortaa_400Regular',
          textMonthFontFamily: 'Comfortaa_400Regular',
          textDayHeaderFontFamily: 'Comfortaa_400Regular',
          todayButtonFontFamily: 'Comfortaa_400Regular',
          todayTextColor: '#000',
          todayButtonFontWeight: 'bold',
        }}
        markedDates={{
          '2023-03-20': {marked: true, dotColor: globalColors.red },
          '2023-03-21': {marked: true, dotColor: globalColors.green },
          '2023-03-15': {marked: true, dotColor: globalColors.gray },
        }}
      />

      <View>

        <View style={styles.indexItemContainer}>
          <View style={{backgroundColor: globalColors.gray, ...styles.circle}}></View>
          <Text style={global.boldTitle}>0 Habits completed</Text>
        </View>

        <View style={styles.indexItemContainer}>
          <View style={{backgroundColor: globalColors.red, ...styles.circle}}></View>
          <Text style={global.boldTitle}>Less than 50% of daily Habits</Text>
        </View>

        <View style={styles.indexItemContainer}>
          <View style={{backgroundColor: globalColors.yellow, ...styles.circle}}></View>
          <Text style={global.boldTitle}>At least 50% of daily Habits</Text>
        </View>


        <View style={styles.indexItemContainer}>
          <View style={{backgroundColor: globalColors.green, ...styles.circle}}></View>
          <Text style={global.boldTitle}>At least 80% of daily Habits</Text>
        </View>

      </View>

      <DayData date={FeedHistory[0].date} habits={FeedHistory[0].habits}  />

    </View>
  )
}

function DayData({date, habits}: HistoryItem) {
  return (
    <View style={{marginVertical: 20, marginLeft: 20}}>
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
  circle: {
    width: 10,
    height: 10,
    borderRadius: 100,
    marginRight: 10
  },
  indexItemContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    alignItems: 'center'
  },
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