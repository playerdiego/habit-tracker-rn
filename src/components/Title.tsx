import { View, Text } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
import { Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { global } from '../styles/global'

interface TitleProps {
    children: string | JSX.Element,
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
    align?: 'center' | 'left' | 'right',
    icon?: string
}

export default function Title({children, size = 'lg', align = 'left', icon}: TitleProps) {

    const [fontLoaded] = useFonts({
        Comfortaa_400Regular,
    });

    if(!fontLoaded) return null;

    return (
        <View 
            style={{
                flexDirection: 'row', 
                justifyContent: align === 'center' ? 'center': 'flex-start', 
                alignItems: 'center',
            }}>
            {icon && <Icon name={icon} solid style={{marginRight: 5, marginTop: 4}} />}
            <Text style={{
                ...global.title,
                fontSize: size === 'xs' ? 13 :  
                        size === 'sm' ? 22 :  
                        size === 'md' ? 26 :  
                        size === 'lg' ? 32 :  
                        size === 'xl' ? 40 : 30,
                textAlign: align === 'center' ? 'center':
                          align === 'left' ? 'left' :
                          align === 'right' ? 'right' : 'auto',
                width: 'auto',
            }}>{children}</Text>
        </View>
    )
}