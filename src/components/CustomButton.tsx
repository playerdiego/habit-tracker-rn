import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { globalColors } from '../styles/global';
import { useFonts } from 'expo-font';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';

interface CustomButtonProps {
    text: String,
    onPressed: Function,
    outline?: Boolean,
    style?: Object
}

export default function CustomButton({outline = false, text, onPressed, style = {}}: CustomButtonProps) {

    const [fontLoaded] = useFonts({
      Roboto_400Regular
    });


    if(!fontLoaded) return null;

  return (
    <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: outline ? globalColors.secondary : globalColors.primary,
          borderColor: outline && globalColors.primary,
          borderWidth: outline && 2,
          ...style
        }}
        onPress={() => onPressed()}>
        <Text style={{...styles.buttonText, color: outline ? globalColors.primary : globalColors.secondary}}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        marginHorizontal: 2,
      },
      buttonText: {
        fontSize: 12,
        lineHeight: 21,
        fontWeight: '600',
        letterSpacing: 0.25,
        color: globalColors.secondary,
        textTransform: 'uppercase',
        fontFamily: 'Roboto_400Regular',
      }
})