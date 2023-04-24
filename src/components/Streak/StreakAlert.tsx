import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import CustomButton from '../CustomButton';
import { HomeNavigationProps } from '../../navigation/HomeNavigation';
import Divider from '../Divider';
import { globalColors } from '../../styles/global';
import ReactText from '../ReactText';
import { HabitsContext } from '../../context/HabitsContext';
import StreaksResume from './StreaksResume';

export default function StreakAlert() {

  const {navigate} = useNavigation<HomeNavigationProps>(); 

  const onClose = () => {
    alert('hola');
  }

  return (
    <View style={styles.streakAlertContainer}>
      {/* <TouchableOpacity onPress={onClose} style={styles.close}>
        <Icon name='times'></Icon>
      </TouchableOpacity> */}

      <StreaksResume />

      <CustomButton onPressed={() => navigate('streak')} text='More' style={{...styles.button, color: globalColors.primary}} />

    </View>
  )
}

const styles = StyleSheet.create({
  streakAlertContainer: {
    borderColor:globalColors.primary,
    borderWidth: 2,
    borderRadius: 4,
    marginVertical: 20,
    position: 'relative',
    paddingTop: 0,
    paddingBottom: 50,
    paddingLeft: 20,
    paddingRight: 40
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingVertical: 7,
    paddingHorizontal: 10
  },
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginHorizontal: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 1
  },
  streakText: {
    fontWeight: 'bold',
    fontSize: 16
  }
});