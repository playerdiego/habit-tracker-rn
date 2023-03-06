import { View, Text, ScrollView } from 'react-native';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Title from '../../components/Title';
import { global } from '../../styles/global';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <ScrollView style={global.container}>
        <Title size='md'>Good Morning! Diego</Title>
      </ScrollView>
    </SafeAreaView>
  )
}