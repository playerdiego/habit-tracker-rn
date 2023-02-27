import { View, Text } from 'react-native'
import React, { Component } from 'react'
import { global } from '../styles/global'
import { useFonts } from 'expo-font';
import { Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';

interface TitleProps {
    children: String
}

export default function Title({children}: TitleProps) {

    const [fontLoaded] = useFonts({
        Comfortaa_400Regular,
    });

    if(!fontLoaded) return null;

    return (
        <View>
            <Text style={global.title}>{children}</Text>
        </View>
    )
}