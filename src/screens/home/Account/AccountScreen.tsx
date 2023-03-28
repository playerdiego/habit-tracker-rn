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
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

export default function AccountScreen() {

  const {navigate} = useNavigation<AccountNavigationProps>();

  const {user, logout} = useContext(AuthContext);

  return (
    <ScrollContainer title='Account'>

      <View style={styles.dataContainer}>

        <Image 
          source={{uri: user?.photoURL || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}}
          style={styles.avatar}
        />

        <Title size='md'>{user?.displayName!}</Title>

        <Text style={{marginVertical: 15,...global.boldTitle}}>{user?.email}</Text>

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
            onPressed={() => logout()} 
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
    marginBottom: 30,
    borderRadius: 100
  },
  dataContainer: {
    textAlign: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 30,
  }
});