import { View, Text, ScrollView } from 'react-native';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import ReactText from '../../components/ReactText';
import { global } from '../../styles/global';
import Title from '../../components/Title';

export default function LoginScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={global.container}>
          <Title>Iniciar Sesión</Title>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}