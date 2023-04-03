import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import Title from '../Title';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { global, globalColors } from '../../styles/global';
import ReactText from '../ReactText';

const totals = [
  {
    icon: 'dumbbell',
    total: 45
  },
  {
    icon: 'book',
    total: 200
  },
  {
    icon: 'code',
    total: 10
  },
  {
    icon: 'dumbbell',
    total: 45
  },
  {
    icon: 'book',
    total: 200
  },
  {
    icon: 'code',
    total: 10
  },
]

export default function StreakTotal() {
  return (
    <View style={{marginTop: 20}}>
      <Title size='sm'>Totals</Title>

      <View style={styles.totalsGrid}>
        {
          totals.map(({icon, total}, index) => (
            <Total total={total} icon={icon} key={icon} index={index} />
          ))
        }
      </View>

    </View>
  )
}

function Total({icon, total, index}: {icon: string, total: number, index: number}) {
  return (
    <View style={{
      borderTopLeftRadius: index === 0 ? 15 : 0,
      borderTopRightRadius: index === 3 ? 15 : 0,
      borderBottomLeftRadius: index === 4 ? 15 : 0,
      borderBottomRightRadius: index === totals.length - 1 ? 15 : 0,
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
    borderRadius: 20
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