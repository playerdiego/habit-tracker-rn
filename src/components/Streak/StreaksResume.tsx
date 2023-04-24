import { View, Text, StyleSheet } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';

import Divider from '../Divider';
import Title from '../Title';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ReactText from '../ReactText';
import { HabitsContext } from '../../context/HabitsContext';

export default function StreaksResume() {

  const {habits} = useContext(HabitsContext);

  return (
    <View style={{marginTop: 20}}>

      <View style={{marginBottom: 20}}>
        <Title size='sm'>Your Streaks</Title>
      </View>

      {
        habits.map(habit => (
          habit.streak > 0 &&
          <View key={habit.id}>

            <View style={styles.textWIcon}>
              <Icon name={habit.icon} style={styles.icon}></Icon>
              <ReactText 
                style={styles.streakText}>
                  You have completed: {habit.title + habit.streak} {habit.streak === 1 ? 'day' : 'days'} in a row
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
    marginVertical: 10,
    marginRight: 25
  },
  icon: {
    marginRight: 15
  }
})