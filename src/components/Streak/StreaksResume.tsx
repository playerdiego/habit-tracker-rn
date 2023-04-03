import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import Divider from '../Divider';
import Title from '../Title';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ReactText from '../ReactText';

interface Streak {
  habit: string,
  streakCount: number,
}

const streaks: Streak[] = [
  {
    habit: 'Entrenar',
    streakCount: 20
  },
  {
    habit: 'Leer',
    streakCount: 22
  },
]

export default function StreaksResume() {
  return (
    <View style={{marginTop: 20}}>

      <Title size='sm'>Resume</Title>
      <View style={styles.textWIcon}>
        <Icon name='check' style={styles.icon}></Icon>
        <ReactText style={styles.streakText}>You have completed your habits 20 days in a row</ReactText>
      </View>

      {
        streaks.map(streak => (
          <View key={streak.habit}>
            <Divider />

            <View style={styles.textWIcon}>
              <Icon name='dumbbell' style={styles.icon}></Icon>
              <ReactText 
                style={styles.streakText}>
                  You have completed: {streak.habit + ' ' + streak.streakCount} days in a row
              </ReactText>
            </View>
          </View>
        ))
      }


    </View>
  )
}

const styles = StyleSheet.create({
  streakText: {
    fontWeight: 'bold',
    fontSize: 18
  },
  textWIcon: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginVertical: 20,
    marginRight: 25
  },
  icon: {
    marginRight: 15
  }
})