import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import CustomButton from '../CustomButton';
import { HomeNavigationProps } from '../../navigation/HomeNavigation';
import Divider from '../Divider';
import { globalColors } from '../../styles/global';

export default function StreakAlert() {

  const {navigate} = useNavigation<HomeNavigationProps>(); 

  const onClose = () => {
    alert('hola');
  }

  return (
    <View style={styles.streakAlertContainer}>
      <TouchableOpacity onPress={onClose} style={styles.close}>
        <Icon name='times'></Icon>
      </TouchableOpacity>

      <View style={{marginVertical: 20}}>
        <Text style={styles.streakText}>You have completed your habits 20 days in a row</Text>
      </View>

      <Divider />

      <View style={{marginVertical: 20}}>
        <Text style={styles.streakText}>You have completed: Workout 25 in a row</Text>
      </View>

      <CustomButton onPressed={() => navigate('streak')} text='More' style={styles.button} />

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
    paddingTop: 20,
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
    fontSize: 18
  }
});