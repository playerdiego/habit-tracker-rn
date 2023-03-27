import { View, Text, ScrollView, TextInput, Pressable, TouchableOpacity } from 'react-native';
import React from 'react'
import { global, globalColors } from '../../styles/global';
import Title from '../../components/Title';
import { Formik, FormikState } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProps } from '../../navigation/AuthNavigation';
import Divider from '../../components/Divider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function RecoverScreen() {

  const {navigate} = useNavigation<AuthNavigationProps>();

  const {recoverAccount} = useContext(AuthContext);

  type FormData = {
    email: ''
  }

  const initialValues: FormData = {email: ''}

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid Email")
  })

  const onRecover = (email: string, resetForm: (nextState?: Partial<FormikState<FormData>> | undefined) => void) => {
    recoverAccount(email);
    resetForm();
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={global.container}>
          <Title>Recover Account</Title>

          <Formik initialValues={initialValues} onSubmit={({email}, {resetForm}) => onRecover(email, resetForm)} validationSchema={validationSchema}>

            {({handleSubmit, handleChange, handleBlur, values, errors, touched}) =>  (

              <View style={{marginTop: 20}}>

                <TextInput
                  style={global.input}
                  placeholder='Type your email'
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  cursorColor={globalColors.gray}
                />
                {(errors.email && touched.email) && (<Text style={{color: 'red'}}>{errors.email}</Text>)}

                <CustomButton text='Recover Account' onPressed={handleSubmit} style={{marginTop: 8}}/>
              </View>

            )}

          </Formik>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}