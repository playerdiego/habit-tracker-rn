import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { global } from '../styles/global';

interface CustomButtonProps {
    text: String,
    onPressed: Function,
    outline?: Boolean,
}

export default function CustomButton({outline = false, text, onPressed}: CustomButtonProps) {

    const colors = {
        default: outline ? '#fff' : '#000',
        hover: outline ? '#cdcdcd' : '#111'
    };

  return (
    <Pressable
        style={({pressed}) => [
        {
            backgroundColor: pressed ? colors.hover : colors.default},
            outline && styles.outlineButton,
            styles.button,
        ]}
        onPress={() => onPressed()}>
        <Text style={{...styles.buttonText, ...global.text, color: outline ? '#000' : '#fff'}}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    button: {
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        marginHorizontal: 2
      },
      buttonText: {
        fontSize: 12,
        lineHeight: 21,
        fontWeight: '600',
        letterSpacing: 0.25,
        color: '#fff',
        textTransform: 'uppercase'
      },
      outlineButton: {
        borderColor: '#000',
        borderWidth: 1
      }
})