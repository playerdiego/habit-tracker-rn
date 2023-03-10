import { View, Text, ScrollView, TextInput, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import ReactText from '../../components/ReactText';
import { global } from '../../styles/global';
import Title from '../../components/Title';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProps } from '../../navigation/AuthNavigation';
import Divider from '../../components/Divider';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function LoginScreen() {

  const {navigate} = useNavigation<AuthNavigationProps>();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  type FormData = {
    email: string,
    password: string
  }

  const initialValues: FormData = { email: '', password: ''};

  const onLogin = (values: FormData) => {
    
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={global.container}>

          <Title>Login</Title>

            <Formik initialValues={initialValues} onSubmit={onLogin} validationSchema={validationSchema}>

            {({handleChange, handleBlur, handleSubmit, values, errors, touched, }) => (
              <View style={{marginTop: 20}}>
                <TextInput 
                  placeholder='Email' 
                  keyboardType='email-address' 
                  style={global.input} 
                  cursorColor='#222' 
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {(errors.email && touched.email) && (<Text style={{color: 'red'}}>{errors.email}</Text>)}

                <TextInput 
                  placeholder='password' 
                  secureTextEntry={true} 
                  style={global.input} 
                  cursorColor='#222'
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {(errors.password && touched.password) && (<Text style={{color: 'red'}}>{errors.password}</Text>)}

                <CustomButton text='Iniciar Sesi??n' onPressed={handleSubmit} style={{marginTop: 8}} />
              </View>
            )}

            </Formik>

          <View style={{marginTop: 30}}>
            <Pressable onPress={() => navigate('recover')}>
              
              <Title size='sm' align='center' icon='key'>Did you forgot your password? Recover Account</Title>
            </Pressable>
          </View>

          <View style={{marginVertical: 30}}>
            <Pressable onPress={() => navigate('register')}>
              <Title size='sm' align='center' icon='user'>Don??t you have an account? Create one here</Title>
            </Pressable>
          </View>

          <Divider />

          <View style={{marginTop: 30, alignItems: 'center'}}>
            <Title size='sm' align='center'>Or you can login with:</Title>
            <TouchableOpacity>
              <Icon name='google' size={40} style={{marginVertical: 20}} />
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )

}