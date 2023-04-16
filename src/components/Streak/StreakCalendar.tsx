import { View, Text, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import {Calendar} from 'react-native-calendars';
import { useFonts } from 'expo-font';
import { Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';

import Title from '../Title'
import { global, globalColors } from '../../styles/global';
import { Habit, HistoryItem, TodayHabit } from '../../interfaces/habit.interface';
import HabitCheckbox from '../HabitCheckbox';
import { HabitsContext } from '../../context/HabitsContext';
import { DateData, MarkedDates } from 'react-native-calendars/src/types';
import dayjs from 'dayjs';
import ReactText from '../ReactText';

export default function StreakCalendar() {

  // * CONTEXT DATA
  const {history, habits, todayHabits} = useContext(HabitsContext);

  // * STATES
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [selectedDay, setSelectedDay] = useState<HistoryItem | null>(null);

  // * ON SELECT DAT
  const onSelectDay = (selectedDate: string) => {
    // Finds a the selected day
    const selectedDayHistory = history.find(historyItem => historyItem.day === selectedDate);

    // If the selected day has data, set it in selectedDay state
    setSelectedDay(selectedDayHistory || null);

    let updatedMarkedDays: MarkedDates = markedDates;

    // Traverse each marked date, to set as "selected" (true) the selected day in the calendar
    Object.keys(markedDates).map((date, i) => {
        updatedMarkedDays[date] = date === selectedDate ? {...Object.values(markedDates)[i], selected: true} : {...Object.values(markedDates)[i], selected: false}
    });

    setMarkedDates(updatedMarkedDays);


  }

  // * UPDATE DATA FOR CALENDAR ON HABITS, TODAY HABITS OR HISTORY UPDATE
  useEffect(() => {

    let dates: MarkedDates = {};
    let completedHabits = 0;
    
    // Traverse the history array
    history.forEach((val) => {
      // Traverse every habit in the day
      val.data.map(dataItem => {
        // If habit is completed, add 1 to completed habits
        dataItem.completed && completedHabits++;
      });
      
      // Get the percentage of completed habits of certain day
      const percentageCompleted = completedHabits / val.data.length;

      // Set the color based on the completed percentage
      const color = 
        percentageCompleted >= .80 ? globalColors.green :
        percentageCompleted >= .50 ? globalColors.yellow :
        percentageCompleted > 0 ? globalColors.red :
        percentageCompleted === 0 ? globalColors.gray : globalColors.gray;

      // Adds a marked day for every day in history  
      dates[val.day] = {
        marked: true,
        dotColor: color,
        selectedColor: globalColors.primary,
        selected: selectedDay?.day === val.day
      };
      
      // Sets completed habits to 0 once the treverse is done
      completedHabits = 0;
    });

    // Sets the selected day to the current day
    onSelectDay(dayjs().format('YYYY-MM-DD'));

    // Sets the marked dates (data for the calendar)
    setMarkedDates(dates);

  }, [history, habits, todayHabits]);
  

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
        markedDates={markedDates}
        onDayPress={(date: DateData) => onSelectDay(date.dateString)}
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

      {
        selectedDay ? 
          <DayData date={selectedDay.day} habits={selectedDay.data}  /> :
          <ReactText style={{...global.boldTitle, fontSize: 16, marginTop: 20}}>Select a day with habits history</ReactText>
      }
      

    </View>
  )
}

function DayData({date, habits}: {date: string, habits: TodayHabit[]}) {
  return (
    <View style={{marginVertical: 20, marginLeft: 20}}>
      <Text style={{...global.boldTitle, fontSize: 16}}>{dayjs(date).format('dddd DD-MM-YYYY')}</Text>

     <View style={styles.habitsGrid}>
      <View style={styles.habitsGridItem}>
        <ReactText style={global.boldTitle}>Completed:</ReactText>

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
          <ReactText style={global.boldTitle}>Incompleted:</ReactText>
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
    marginVertical: 20
  },
  habitsGridItem: {
    width: '50%',
    flexGrow: 1
  }
})