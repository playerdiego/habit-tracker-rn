import { View, Text, TextInput, Pressable } from 'react-native';
import React, { useContext, useState } from 'react'
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';

import { global, globalColors } from '../../styles/global';
import Title from '../../components/Title';
import CustomButton from '../../components/CustomButton';
import { AuthNavigationProps } from '../../navigation/AuthNavigation';
import Divider from '../../components/Divider';
import ScrollContainer from '../../components/ScrollContainer';
import { AuthContext } from '../../context/AuthContext';
import ImagePickerComponent from '../../components/ImagePickerComponent';
import { UIContext } from '../../context/UIContext';

export default function RegisterScreen() {

  const {registerWithEmail} = useContext(AuthContext);
  const {i18n} = useContext(UIContext);

  const {navigate, goBack} = useNavigation<AuthNavigationProps>()

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(i18n.t('nameRequired')),
    email: Yup.string().email(i18n.t('invalidEmail')).required(i18n.t('emailRequired')),
    password: Yup.string().required(i18n.t('passwordRequired')).min(6, i18n.t('passwordMin')),
    passwordCfm: Yup.string().required(i18n.t('passwordCfmRequired'))
      .oneOf([Yup.ref('password')], i18n.t('passwordsMatch')),
  })

  type FormData = {
    name: string,
    email: string,
    password: string,
    passwordCfm: string
  }

  const initialValues: FormData = {
    name: '',
    email: '',
    password: '',
    passwordCfm: ''
  }

  const onRegister = ({name, email, password}: FormData) => {
    registerWithEmail(name, email, password, profilePic!);
  }

  const [profilePic, setProfilePic] = useState<null | ImagePicker.ImagePickerResult>(null);

  return (
    <ScrollContainer title={i18n.t('register')} goBack={() => goBack()}>

          <ImagePickerComponent profilePic={profilePic} setProfilePic={setProfilePic} />

          <Formik initialValues={initialValues} onSubmit={onRegister} validationSchema={validationSchema}>

            {({handleSubmit, handleChange, handleBlur, values, errors, touched}) =>  (

              <View style={{marginTop: 10}}>

                <TextInput
                  style={global.input}
                  placeholder={i18n.t('yourName')}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  cursorColor={globalColors.gray}
                />
                {(errors.name && touched.name) && (<Text style={{color: 'red'}}>{errors.name}</Text>)}

                <TextInput
                  style={global.input}
                  placeholder='Email'
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  cursorColor={globalColors.gray}
                />
                {(errors.email && touched.email) && (<Text style={{color: 'red'}}>{errors.email}</Text>)}

                <TextInput
                  style={global.input}
                  secureTextEntry={true}
                  placeholder={i18n.t('password')}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  cursorColor={globalColors.gray}
                />
                {(errors.password && touched.password) && (<Text style={{color: 'red'}}>{errors.password}</Text>)}

                <TextInput
                  style={global.input}
                  secureTextEntry={true}
                  placeholder={i18n.t('repeatPassword')}
                  value={values.passwordCfm}
                  onChangeText={handleChange('passwordCfm')}
                  onBlur={handleBlur('passwordCfm')}
                  cursorColor={globalColors.gray}
                />
                {(errors.passwordCfm && touched.passwordCfm) && (<Text style={{color: 'red'}}>{errors.passwordCfm}</Text>)}

                <CustomButton text={i18n.t('register')} onPressed={handleSubmit} style={{marginTop: 8}}/>
              </View>

            )}

          </Formik>

          <View style={{marginTop: 30}}>
              <Pressable onPress={() => navigate('recover')}>
                <Title size='xs' align='center' icon='key'>{i18n.t('passwordForgotten')}</Title>
              </Pressable>
          </View>

          <View style={{marginVertical: 30}}>
            <Pressable onPress={() => navigate('login')}>
              <Title size='xs' align='center' icon='user'>{i18n.t('loginInstead')}</Title>
            </Pressable>
          </View>

          {/* <Divider />

          <View style={{marginTop: 30, alignItems: 'center'}}>
            <Title size='xs' align='center'>Or you can create an account with:</Title>
            <TouchableOpacity>
              <Icon name='google' size={40} style={{marginVertical: 20}} />
            </TouchableOpacity>
          </View> */}

    </ScrollContainer>
  )
}