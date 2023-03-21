import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Title from '../Title'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { global, globalColors } from '../../styles/global';

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
          totals.map(({icon, total}) => (
            <Total total={total} icon={icon} key={icon} />
          ))
        }
      </View>

    </View>
  )
}

function Total({icon, total}: {icon: string, total: number}) {
  return (
    <View style={styles.totalItem}>
      <Icon name={icon} size={30} style={{marginBottom: 10}}></Icon>
      <Text style={global.boldTitle}>{total}</Text>
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
    borderColor: globalColors.primary
  },
  totalItem: {
    flexGrow: 1,
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    borderWidth: 1,
    borderColor: globalColors.primary
  }
});