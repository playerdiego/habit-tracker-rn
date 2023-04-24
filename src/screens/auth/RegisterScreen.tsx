import { View, Text, TextInput, Pressable, TouchableOpacity, Image, Alert } from 'react-native';
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

export default function RegisterScreen() {

  const {registerWithEmail} = useContext(AuthContext);

  const {navigate, goBack} = useNavigation<AuthNavigationProps>()

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().required("Password is required").min(6, 'Password Min length: 6 characters'),
    passwordCfm: Yup.string().required('Password confirm is required').oneOf([Yup.ref('password')], 'Passwords doesn´t match'),
  })

  type FormData = {
    name: string,
    email: string,
    password: string,
    passwordCfm: string
  }

  const initialValues: FormData = {
    name: 'Diego',
    email: 'diego@diego.com',
    password: '123456',
    passwordCfm: '123456'
  }

  const onRegister = ({name, email, password}: FormData) => {
    registerWithEmail(name, email, password, profilePic!);
  }

  const [profilePic, setProfilePic] = useState<null | ImagePicker.ImagePickerResult>(null);

  return (
    <ScrollContainer title='Create Account' goBack={() => goBack()}>

          <ImagePickerComponent profilePic={profilePic} setProfilePic={setProfilePic} />

          <Formik initialValues={initialValues} onSubmit={onRegister} validationSchema={validationSchema}>

            {({handleSubmit, handleChange, handleBlur, values, errors, touched}) =>  (

              <View style={{marginTop: 10}}>

                <TextInput
                  style={global.input}
                  placeholder='Your name'
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  cursorColor={globalColors.gray}
                />
                {(errors.name && touched.name) && (<Text style={{color: 'red'}}>{errors.name}</Text>)}

                <TextInput
                  style={global.input}
                  placeholder='Type your email'
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  cursorColor={globalColors.gray}
                />
                {(errors.email && touched.email) && (<Text style={{color: 'red'}}>{errors.email}</Text>)}

                <TextInput
                  style={global.input}
                  secureTextEntry={true}
                  placeholder='Password'
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  cursorColor={globalColors.gray}
                />
                {(errors.password && touched.password) && (<Text style={{color: 'red'}}>{errors.password}</Text>)}

                <TextInput
                  style={global.input}
                  secureTextEntry={true}
                  placeholder='Repeat your password'
                  value={values.passwordCfm}
                  onChangeText={handleChange('passwordCfm')}
                  onBlur={handleBlur('passwordCfm')}
                  cursorColor={globalColors.gray}
                />
                {(errors.passwordCfm && touched.passwordCfm) && (<Text style={{color: 'red'}}>{errors.passwordCfm}</Text>)}

                <CustomButton text='Create Account' onPressed={handleSubmit} style={{marginTop: 8}}/>
              </View>

            )}

          </Formik>

          <View style={{marginTop: 30}}>
              <Pressable onPress={() => navigate('recover')}>
                <Title size='xs' align='center' icon='key'>Did you forgot your password? Recover Account</Title>
              </Pressable>
          </View>

          <View style={{marginVertical: 30}}>
            <Pressable onPress={() => navigate('login')}>
              <Title size='xs' align='center' icon='user'>Do you already have an account? Login here</Title>
            </Pressable>
          </View>

          <Divider />

          <View style={{marginTop: 30, alignItems: 'center'}}>
            <Title size='xs' align='center'>Or you can create an account with:</Title>
            <TouchableOpacity>
              <Icon name='google' size={40} style={{marginVertical: 20}} />
            </TouchableOpacity>
          </View>

    </ScrollContainer>
  )
}