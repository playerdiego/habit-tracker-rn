import { View, Text, ScrollView, TextInput, Pressable, TouchableOpacity } from 'react-native';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { global } from '../../styles/global';
import Title from '../../components/Title';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProps } from '../../navigation/AuthNavigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Divider from '../../components/Divider';
import ScrollContainer from '../../components/ScrollContainer';

export default function RegisterScreen() {

  const {navigate} = useNavigation<AuthNavigationProps>()

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().required("Password is required").min(6, 'Password Min length: 6 characters'),
    passwordCfm: Yup.string().required('Password confirm is required').min(6, 'Password Min length: 6 characters'),
  })

  type FormData = {
    username: string,
    email: string,
    password: string,
    passwordCfm: string
  }

  const initialValues: FormData = {
    username: '',
    email: '',
    password: '',
    passwordCfm: ''
  }

  const onRegister = (values: FormData) => {

  }

  return (
    <ScrollContainer title='Create Account'>

          <Formik initialValues={initialValues} onSubmit={onRegister} validationSchema={validationSchema}>

            {({handleSubmit, handleChange, handleBlur, values, errors, touched}) =>  (

              <View style={{marginTop: 20}}>

                <TextInput
                  style={global.input}
                  placeholder='Create an username'
                  value={values.username}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  cursorColor='#222'
                />
                {(errors.username && touched.username) && (<Text style={{color: 'red'}}>{errors.username}</Text>)}

                <TextInput
                  style={global.input}
                  placeholder='Type your email'
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  cursorColor='#222'
                />
                {(errors.email && touched.email) && (<Text style={{color: 'red'}}>{errors.email}</Text>)}

                <TextInput
                  style={global.input}
                  placeholder='Password'
                  value={values.email}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  cursorColor='#222'
                />
                {(errors.password && touched.password) && (<Text style={{color: 'red'}}>{errors.password}</Text>)}

                <TextInput
                  style={global.input}
                  placeholder='Repeat your password'
                  value={values.email}
                  onChangeText={handleChange('passwordCfm')}
                  onBlur={handleBlur('passwordCfm')}
                  cursorColor='#222'
                />
                {(errors.passwordCfm && touched.passwordCfm) && (<Text style={{color: 'red'}}>{errors.passwordCfm}</Text>)}

                <CustomButton text='Create Account' onPressed={handleSubmit} style={{marginTop: 8}}/>
              </View>

            )}

          </Formik>

          <View style={{marginTop: 30}}>
              <Pressable onPress={() => navigate('recover')}>
                <Title size='sm' align='center' icon='key'>Did you forgot your password? Recover Account</Title>
              </Pressable>
          </View>

          <View style={{marginVertical: 30}}>
            <Pressable onPress={() => navigate('login')}>
              <Title size='sm' align='center' icon='user'>Do you already have an account? Login here</Title>
            </Pressable>
          </View>

          <Divider />

          <View style={{marginTop: 30, alignItems: 'center'}}>
            <Title size='sm' align='center'>Or you can create an account with:</Title>
            <TouchableOpacity>
              <Icon name='google' size={40} style={{marginVertical: 20}} />
            </TouchableOpacity>
          </View>

    </ScrollContainer>
  )
}