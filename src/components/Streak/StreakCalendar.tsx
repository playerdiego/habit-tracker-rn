import { View, Text, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { useFonts } from 'expo-font';
import { Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';

import Title from '../Title'
import { global, globalColors } from '../../styles/global';
import { HistoryItem, TodayHabit } from '../../interfaces/habit.interface';
import HabitCheckbox from '../HabitCheckbox';
import { HabitsContext } from '../../context/HabitsContext';
import { DateData, MarkedDates } from 'react-native-calendars/src/types';
import dayjs from 'dayjs';
import ReactText from '../ReactText';
import { UIContext } from '../../context/UIContext';

export default function StreakCalendar() {

  // * CONTEXT DATA
  const {history, habits, todayHabits} = useContext(HabitsContext);
  const {i18n, locale} = useContext(UIContext);

  LocaleConfig.locales['es'] = {
    monthNames: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ],
    monthNamesShort: ['En.', 'Feb.', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Sept.', 'Oct.', 'Nov.', 'Dic.'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Do.', 'Lun.', 'Mar.', 'Mier.', 'Jue.', 'Vie.', 'Sab.'],
    today: "Hoy"
  };

  LocaleConfig.locales['en'] = {
    monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
    ],
    monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
    today: "Today"
  };

  const localeCode = locale.split('-')[0];

  if(localeCode === 'es' || localeCode === 'en') {
    LocaleConfig.defaultLocale = localeCode;
  } else {
    LocaleConfig.defaultLocale = 'en';
  }
  

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
        updatedMarkedDays[date] = date === selectedDate ? {...Object.values(markedDates)[i], selected: true, marked: true} : {...Object.values(markedDates)[i], selected: false}
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

      
      // Sets the selected day to the current day
      onSelectDay(dayjs().format('YYYY-MM-DD'));

      // Adds a marked day for every day in history  
      dates[val.day] = {
        marked: true,
        dotColor: color,
        selectedColor: globalColors.primary,
        selected: dayjs().format('YYYY-MM-DD') === val.day
      };
      
      // Sets completed habits to 0 once the treverse is done
      completedHabits = 0;
    });



    // Sets the marked dates (data for the calendar)
    setMarkedDates(dates);

  }, [todayHabits]);

  useEffect(() => {
    
  
    return () => {
      
    }
  }, [])
  

  

  const [fontLoaded] = useFonts({
      Comfortaa_400Regular,
  });

  if(!fontLoaded) return null;

  return (
    <View style={{marginVertical: 20}}>
      <Title size='sm'>{i18n.t('calendar')}</Title>


      <View style={{marginVertical: 10}}>

        <View style={styles.indexItemContainer}>
          <View style={{backgroundColor: globalColors.gray, ...styles.circle}}></View>
          <Text style={global.boldTitle}>{i18n.t('zeroCompleted')}</Text>
        </View>

        <View style={styles.indexItemContainer}>
          <View style={{backgroundColor: globalColors.red, ...styles.circle}}></View>
          <Text style={global.boldTitle}>{i18n.t('lessHalfCompleted')}</Text>
        </View>

        <View style={styles.indexItemContainer}>
          <View style={{backgroundColor: globalColors.yellow, ...styles.circle}}></View>
          <Text style={global.boldTitle}>{i18n.t('atLeast50')}</Text>
        </View>


        <View style={styles.indexItemContainer}>
          <View style={{backgroundColor: globalColors.green, ...styles.circle}}></View>
          <Text style={global.boldTitle}>{i18n.t('atLeast80')}</Text>
        </View>

      </View>

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

      {
        selectedDay ? 
          <DayData date={selectedDay.day} habits={selectedDay.data}  /> :
          <ReactText style={{...global.boldTitle, fontSize: 16, marginTop: 20}}>{i18n.t('selectADay')}</ReactText>
      }
      

    </View>
  )
}

function DayData({date, habits}: {date: string, habits: TodayHabit[]}) {

  const {i18n, locale} = useContext(UIContext);

  return (
    <View style={{marginVertical: 20, marginLeft: 20}}>
      <Text style={{...global.boldTitle, fontSize: 16}}>{dayjs(date).format('DD/MM/YYYY')}</Text>

     <View style={styles.habitsGrid}>
      <View style={styles.habitsGridItem}>
        <ReactText style={global.boldTitle}>{i18n.t('completed')}</ReactText>

          {
            habits.map(habit => (
              habit.completed &&
              <HabitCheckbox
                key={habit.id}
                habit={habit} size='sm' history={true}  />
            ))
          }
        </View>
        <View style={styles.habitsGridItem}>
          <ReactText style={global.boldTitle}>{i18n.t('incompleted')}</ReactText>
          {
            habits.map(habit => (
              !habit.completed &&
              <HabitCheckbox
                key={habit.id}
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