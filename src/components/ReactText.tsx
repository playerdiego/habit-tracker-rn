import { View, Text } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import { global } from '../styles/global';

interface ReactTextProps {
    children: String,
    style?: Object
}

export default function ReactText({children, style}: ReactTextProps) {

    const [fontLoaded] = useFonts({
        Roboto_400Regular
    });

    if(!fontLoaded) return null;


  return (
    <View>
      <Text style={{...style, ...global.text}}>{children}</Text>
    </View>
  )
}