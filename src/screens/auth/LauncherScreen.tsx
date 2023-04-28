import { View, StyleSheet, ImageBackground, Image, Text} from 'react-native';
import React, {useContext} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import { useNavigation } from '@react-navigation/native';

import { globalColors } from '../../styles/global';
import CustomButton from '../../components/CustomButton';
import { AuthNavigationProps } from '../../navigation/AuthNavigation';
import { UIContext } from '../../context/UIContext';

export default function LauncherScreen() {

  const navigation = useNavigation<AuthNavigationProps>();
  const {i18n} = useContext(UIContext);

  const [fontLoaded] = useFonts({
    Comfortaa_400Regular,
    Roboto_400Regular
  });



  if(!fontLoaded) return null;

  return (
    <SafeAreaView>

      <View style={styles.banner}>
        <ImageBackground source={require('../../assets/bg_landing.jpg')} resizeMode='cover' style={styles.image} >
          <View style={styles.titleContainer}>
            <Image style={styles.logo} source={require('../../assets/logo.png')} />
            <Text style={styles.credits}>{i18n.t('madeBy')} Diego Sebastián</Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.buttons}>

        <CustomButton style={{width: '45%'}} onPressed={() => navigation.navigate('login')} text={i18n.t('login')} outline={true} />
        <CustomButton style={{width: '45%'}} onPressed={() => navigation.navigate('register')} text={i18n.t('register')} />

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
    backgroundColor: globalColors.background,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: globalColors.primary,
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
  logo: {
    width: 180,
    height: 90
  },
  credits: {
    fontFamily: 'Comfortaa_400Regular',
    fontSize: 10,
    textAlign: 'center'
  }
});