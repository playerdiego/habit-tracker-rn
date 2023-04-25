import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface CustomBackButton {
    onPressed: Function
}

export default function CustomBackButton({onPressed}: CustomBackButton) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => onPressed()}>
        <Icon name='arrow-left' />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 40,
    width: 50,
    height: 50
  }
})