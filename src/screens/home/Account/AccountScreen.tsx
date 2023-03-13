import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { global } from '../../../styles/global';
import Title from '../../../components/Title';
import CustomButton from '../../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { HomeNavigationProps } from '../../../navigation/HomeNavigation';
import { AccountNavigationProps } from '../../../navigation/AccountNavigation';
import ScrollContainer from '../../../components/ScrollContainer';

export default function AccountScreen() {

  const {navigate} = useNavigation<AccountNavigationProps>();
  
  const onLogout = () => {

  }

  return (
    <ScrollContainer title='Account'>

      <View style={styles.dataContainer}>

        <Image 
          source={{uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}}
          style={styles.avatar}
        />

        <Title size='md'>PlayerDiego</Title>

        <Text style={{marginVertical: 15,...global.boldTitle}}>Frase Motivadora</Text>
        <Text style={{marginBottom: 15,...global.boldTitle}}>info@app.com</Text>

        <View style={{width: '100%', marginTop: 50}}>
          <CustomButton 
            onPressed={() => navigate('edit')}
            text='Edit Profile'
            style={{marginBottom: 20, width: '100%'}} 
          />

          <CustomButton 
            onPressed={() => navigate('password')}
            text='Change Password'
            style={{marginBottom: 20, width: '100%'}} 
          />

          <CustomButton 
            onPressed={() => onLogout()} 
            text='Logout' outline={true} 
            style={{width: '100%'}}
          />
        </View>


      </View>
    </ScrollContainer>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: 170,
    height: 170,
    marginBottom: 30
  },
  dataContainer: {
    textAlign: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 30,
  }
});