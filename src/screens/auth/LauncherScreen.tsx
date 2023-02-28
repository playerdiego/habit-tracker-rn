import { View, Text, StyleSheet, ImageBackground, Button, Pressable, ScrollView, Touchable, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { global } from '../../styles/global';
import { useFonts, Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import Title from '../../components/Title';
import { AuthNavigationProps } from '../../navigation/AuthNavigation';

export default function LauncherScreen() {

  const [fontLoaded] = useFonts({
    Comfortaa_400Regular,
    Roboto_400Regular
  });

  const navigation = useNavigation<AuthNavigationProps>();

  if(!fontLoaded) return null;

  return (
    <SafeAreaView>

      <View style={styles.banner}>
        <ImageBackground source={require('../../assets/bg_landing.jpg')} resizeMode='cover' style={styles.image} >
          <View style={styles.titleContainer}>
            <Title>Habits Tracker</Title>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.buttons}>

        <CustomButton style={{width: '45%'}} onPressed={() => navigation.navigate('login')} text='Iniciar Sesión' outline={true} />
        <CustomButton style={{width: '45%'}} onPressed={() => navigation.navigate('register')} text='Crear Cuenta' />

      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  banner: {
    height: '90%'
  },
  image: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: '10%'
  },
});