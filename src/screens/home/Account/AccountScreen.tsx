import { View, Text, ScrollView, Image, StyleSheet, Alert } from 'react-native';
import React, { useContext } from 'react'
import { global, globalColors } from '../../../styles/global';
import { useNavigation } from '@react-navigation/native';

import Title from '../../../components/Title';
import CustomButton from '../../../components/CustomButton';
import { AccountNavigationProps } from '../../../navigation/AccountNavigation';
import ScrollContainer from '../../../components/ScrollContainer';
import { AuthContext } from '../../../context/AuthContext';
import ReactText from '../../../components/ReactText';
import { UIContext } from '../../../context/UIContext';

export default function AccountScreen() {

  const {navigate} = useNavigation<AccountNavigationProps>();
  const {i18n} = useContext(UIContext);

  const {user, logout} = useContext(AuthContext);

  const showLogoutAlert = () => {
    Alert.alert(i18n.t('doYouLogout'), '', [
      {
        text: i18n.t('cancel'),
        style: 'cancel'
      },
      {
        text: i18n.t('logout'),
        onPress: () => logout(),
        style: 'destructive',
      },
    ], {cancelable: true});
  }

  return (
    <ScrollContainer title={i18n.t('account')}>

      <View style={styles.dataContainer}>

        <Image 
          source={{uri: user?.photoURL || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}}
          style={styles.avatar}
        />

        {
          !user?.photoURL &&
          <ReactText style={{marginBottom: 10, color: globalColors.yellow}}>{i18n.t('uploadPictureAlert')}</ReactText>
        }


        <Title size='md'>{user?.displayName!}</Title>

        <ReactText style={{marginVertical: 15,...global.boldTitle}}>{user?.email!}</ReactText>

        <View style={{width: '100%', marginTop: 50}}>
          <CustomButton 
            onPressed={() => navigate('edit')}
            text={i18n.t('editProfile')}
            style={{marginBottom: 20, width: '100%'}} 
          />

          <CustomButton 
            onPressed={() => navigate('password')}
            text={i18n.t('changePassword')}
            style={{marginBottom: 20, width: '100%'}} 
          />

          <CustomButton 
            onPressed={() => showLogoutAlert()} 
            text={i18n.t('logout')} outline={true} 
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