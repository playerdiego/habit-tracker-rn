import { View, Text, TextInput, Pressable } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProps } from '../../navigation/AuthNavigation';
import { Formik } from 'formik';
import * as Yup from 'yup';

import ScrollContainer from '../../components/ScrollContainer';
import { global, globalColors } from '../../styles/global';
import Title from '../../components/Title';
import CustomButton from '../../components/CustomButton';
import { AuthContext } from '../../context/AuthContext';
import { UIContext } from '../../context/UIContext';

export default function LoginScreen() {

  const {navigate, goBack} = useNavigation<AuthNavigationProps>();
  const {i18n} = useContext(UIContext);

  const {loginWithEmail} = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(i18n.t('invalidEmail')).required(i18n.t('emailRequired')),
    password: Yup.string().required(i18n.t('passwordRequired')),
  });

  type FormData = {
    email: string,
    password: string
  }

  const initialValues: FormData = { email: '', password: ''};

  const onLogin = async ({email, password}: FormData) => {
    await loginWithEmail(email, password);
  }

  return (
    <ScrollContainer title={i18n.t('login')} goBack={() => goBack()}>
      <Formik initialValues={initialValues} onSubmit={onLogin} validationSchema={validationSchema}>

      {({handleChange, handleBlur, handleSubmit, values, errors, touched, }) => (
        <View style={{marginTop: 20}}>
          <TextInput 
            placeholder='Email' 
            style={global.input} 
            cursorColor={globalColors.gray} 
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {(errors.email && touched.email) && (<Text style={{color: 'red'}}>{errors.email}</Text>)}

          <TextInput 
            placeholder={i18n.t('password')}
            secureTextEntry={true} 
            style={global.input} 
            cursorColor={globalColors.gray}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          {(errors.password && touched.password) && (<Text style={{color: 'red'}}>{errors.password}</Text>)}

          <CustomButton text={i18n.t('login')} onPressed={handleSubmit} style={{marginTop: 8}} />
        </View>
      )}

      </Formik>

      <View style={{marginTop: 30}}>
        <Pressable onPress={() => navigate('recover')}>
          <Title size='xs' align='center' icon='key'>{i18n.t('passwordForgotten')}</Title>
        </Pressable>
      </View>

      <View style={{marginVertical: 30}}>
        <Pressable onPress={() => navigate('register')}>
          <Title size='xs' align='center' icon='user'>{i18n.t('createAccount')}</Title>
        </Pressable>
      </View>

      {/* <Divider />

      <View style={{marginTop: 30, alignItems: 'center'}}>
        <Title size='xs' align='center'>Or you can login with:</Title>
        <TouchableOpacity>
          <Icon name='google' size={40} style={{marginVertical: 20}} />
        </TouchableOpacity>
      </View> */}
    </ScrollContainer>
  )

}