import { View, Text } from 'react-native';
import React, { ReactElement } from 'react';
import { useFonts } from 'expo-font';
import { Roboto_400Regular, Roboto_900Black } from '@expo-google-fonts/roboto';

import { global } from '../styles/global';

interface ReactTextProps {
    children: String | number | string[] | ReactElement | ReactElement[],
    bold?: boolean,
    style?: {}
}

export default function ReactText({children, style, bold = false}: ReactTextProps) {

    const [fontLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_900Black
    });

    if(!fontLoaded) return null;


  return (
    <View>
      <Text style={{...style, ...global.text, fontFamily: bold ? 'Roboto_900Black' : 'Roboto_400Regular'}}>{children}</Text>
    </View>
  )
}