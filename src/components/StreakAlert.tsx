import { View, Text, StyleSheet, Pressable, TouchableOpacity, Button } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CustomButton from './CustomButton';
import { useNavigation } from '@react-navigation/native';
import { HomeNavigationProps } from '../navigation/HomeNavigation';
import Divider from './Divider';

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
        <Text style={styles.streakText}>Llevas 20 días cumpliendo al menos 3 hábitos</Text>
      </View>

      <Divider />

      <View style={{marginVertical: 20}}>
        <Text style={styles.streakText}>Has cumplido con: Entrenamiento 84 días en total</Text>
      </View>

      <CustomButton onPressed={() => navigate('streak')} text='Ver todo' style={styles.button} />

    </View>
  )
}

const styles = StyleSheet.create({
  streakAlertContainer: {
    borderColor:'#000',
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