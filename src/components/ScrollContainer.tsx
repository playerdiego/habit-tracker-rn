import { View, ScrollView } from 'react-native';
import React, { ReactElement } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import { global } from '../styles/global';
import Title from './Title';
import CustomBackButton from './CustomBackButton';

interface ContainerProps {
    children: ReactElement | ReactElement[],
    title: string,
    titleSize?: 'lg' | 'md',
    goBack?: Function | null
}

export default function ScrollContainer({children, title, titleSize = 'lg', goBack = null}: ContainerProps) {
  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <ScrollView style={{height: '100%'}}>

        <View style={global.container}>

          {goBack && <CustomBackButton onPressed={goBack} />}

          <Title size={titleSize}>{title}</Title>

          <View style={{marginTop: 20}}>
            {children}
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}