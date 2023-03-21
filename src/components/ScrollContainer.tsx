import { View, Text, ScrollView } from 'react-native';
import React, { ReactElement } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { global } from '../styles/global';
import Title from './Title';

interface ContainerProps {
    children: ReactElement | ReactElement[],
    title: string,
    titleSize?: 'lg' | 'md'
}

export default function ScrollContainer({children, title, titleSize = 'lg'}: ContainerProps) {
  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <ScrollView style={{height: '100%'}}>

        <View style={global.container}>

          <Title size={titleSize}>{title}</Title>

          <View style={{marginTop: 20}}>
            {children}
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}