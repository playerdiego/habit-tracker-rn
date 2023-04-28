import { View, Text, TextInput } from 'react-native';
import React, { useContext } from 'react';
import { Formik, FormikState } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

import { AuthNavigationProps } from '../../navigation/AuthNavigation';
import { global, globalColors } from '../../styles/global';
import { AuthContext } from '../../context/AuthContext';
import CustomButton from '../../components/CustomButton';
import ScrollContainer from '../../components/ScrollContainer';
import { UIContext } from '../../context/UIContext';

export default function RecoverScreen() {

  const {goBack} = useNavigation<AuthNavigationProps>();
  const {i18n} = useContext(UIContext);

  const {recoverAccount} = useContext(AuthContext);

  type FormData = {
    email: ''
  }

  const initialValues: FormData = {email: ''}

  const validationSchema = Yup.object().shape({
    email: Yup.string().required(i18n.t('emailRequired')).email(i18n.t('invalidEmail'))
  })

  const onRecover = (email: string, resetForm: (nextState?: Partial<FormikState<FormData>> | undefined) => void) => {
    recoverAccount(email);
    resetForm();
  }

  return (
    <ScrollContainer title={i18n.t('recoverAccount')} goBack={() => goBack()}>

      <Formik initialValues={initialValues} onSubmit={({email}, {resetForm}) => onRecover(email, resetForm)} validationSchema={validationSchema}>

      {({handleSubmit, handleChange, handleBlur, values, errors, touched}) =>  (

        <View style={{marginTop: 20}}>

          <TextInput
            style={global.input}
            placeholder='Email'
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            cursorColor={globalColors.gray}
          />
          {(errors.email && touched.email) && (<Text style={{color: 'red'}}>{errors.email}</Text>)}

          <CustomButton text={i18n.t('recoverAccount')} onPressed={handleSubmit} style={{marginTop: 8}}/>
        </View>

      )}

      </Formik>

    </ScrollContainer>
  )
}