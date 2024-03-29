import { View, Text, StyleSheet } from 'react-native';
import React, { useContext } from 'react';

import Title from '../Title';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { HabitsContext } from '../../context/HabitsContext';
import { UIContext } from '../../context/UIContext';

export default function StreaksResume() {

  const {habits} = useContext(HabitsContext);
  const {i18n} = useContext(UIContext);

  return (
    <View style={{marginTop: 20}}>

      <View style={{marginBottom: 20}}>
        <Title size='sm'>{i18n.t('yourStreaks')}</Title>
      </View>

      {
        habits.map(habit => (
          habit.streak > 0 &&
          <View key={habit.id}>

            <View style={styles.textWIcon}>
              <Icon name={habit.icon} style={styles.icon}></Icon>
              <Text 
                style={styles.streakText}>
                  {i18n.t('youCompleted')}{'"' + habit.title + '" ' + habit.streak} {habit.streak === 1 ? i18n.t('day') : i18n.t('days')}
                  {habit.streak === 1 ? i18n.t('inARow') : i18n.t('inARowPlural')}
              </Text>
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