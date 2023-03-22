import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';

interface CustomBackButton {
    onPressed: Function
}

export default function CustomBackButton({onPressed}: CustomBackButton) {
  return (
    <TouchableOpacity style={{marginBottom: 40}} onPress={() => onPressed()}>
        <Icon name='arrow-left' />
    </TouchableOpacity>
  )
}