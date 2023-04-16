import { View, Text, StyleSheet } from 'react-native';
import React, { useContext, useEffect } from 'react';

import Title from '../Title';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { global, globalColors } from '../../styles/global';
import ReactText from '../ReactText';
import { HabitsContext } from '../../context/HabitsContext';

export default function StreakTotal() {

  const {habits} = useContext(HabitsContext);

  return (
    <View style={{marginTop: 20}}>
      <Title size='sm'>Totals</Title>

      <View style={styles.totalsGrid}>
        {
          habits.map(({icon, total}, index) => (
            <Total total={total} icon={icon} key={icon} index={index} />
          ))
        }
      </View>

    </View>
  )
}

function Total({icon, total, index}: {icon: string, total: number, index: number}) {

  const {habits} = useContext(HabitsContext);

  return (
    <View style={{
      ...styles.totalItem
    }}>
      <Icon name={icon} size={30} style={{marginBottom: 10}}></Icon>
      <ReactText style={global.boldTitle}>{total}</ReactText>
    </View>
  )
}

const styles = StyleSheet.create({
  totalsGrid: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: globalColors.primary,
  },
  totalItem: {
    flexGrow: 1,
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    borderWidth: 1,
    borderColor: globalColors.primary,
  }
});