import { View, Text, Pressable, StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import React from 'react';
import { global, globalColors } from '../styles/global';
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

    const colors = {
        default: outline ? globalColors.secondary : globalColors.primary,
        hover: outline ? globalColors.gray : globalColors.primary
    };

    if(!fontLoaded) return null;

  return (
    <Pressable
        style={({pressed}) => [
        {
            backgroundColor: pressed ? colors.hover : colors.default},
            outline && styles.outlineButton,
            styles.button,
            style
        ]}
        onPress={() => onPressed()}>
        <Text style={{...styles.buttonText, color: outline ? globalColors.primary : globalColors.secondary}}>{text}</Text>
    </Pressable>
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
      },
      outlineButton: {
        borderColor: globalColors.primary,
        borderWidth: 2
      }
})