import { View, Text, ScrollView, TextInput, Alert } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { Formik } from 'formik';

import { AccountNavigationProps } from '../../../navigation/AccountNavigation';
import { global, globalColors } from '../../../styles/global';
import Title from '../../../components/Title';
import CustomButton from '../../../components/CustomButton';
import CustomBackButton from '../../../components/CustomBackButton';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { UIContext } from '../../../context/UIContext';

export default function ChangePasswordScreen() {

    const {changePassword} = useContext(AuthContext);
    const {i18n} = useContext(UIContext);

    const {navigate} = useNavigation<AccountNavigationProps>();

    const validationSchema = Yup.object().shape({
        currentPassword: Yup.string().required(i18n.t('currentPasswordRequired')),
        newPassword: Yup.string().required(i18n.t('newPasswordRequired')).min(6, i18n.t('passwordMin')),
        newPasswordCfm: Yup.string().required(i18n.t('passwordCfmRequired')).oneOf([Yup.ref('newPassword')], i18n.t('passwordsMatch')),
      });

    type FormData = {
        currentPassword: string,
        newPassword: string,
        newPasswordCfm: string
    }

    const initialValues: FormData = {
        currentPassword: '',
        newPassword: '',
        newPasswordCfm: ''
    }

    const onChangePassword = ({newPassword, currentPassword}: FormData) => {
        changePassword(newPassword, currentPassword);
    }

    const showConfirmAlert = (formData: FormData) => {
        Alert.alert(i18n.t('uSure'), i18n.t('passwordWillChange'), [
            {   
                text: i18n.t('cancel'),
                style: 'cancel'
            },
            {
                text: i18n.t('confirm'),
                onPress: () => onChangePassword(formData),
                style: 'destructive'
            },
        ], {cancelable: true});
    }

    return (
        <SafeAreaView edges={['top']}>
            <ScrollView style={{height: '100%'}}>


                <View style={global.container}>

                    <CustomBackButton onPressed={() => {navigate('data')}} />

                    
                    <Title>{i18n.t('changePassword')}</Title>

                    <Formik initialValues={initialValues} onSubmit={showConfirmAlert} validationSchema={validationSchema}>

                        {({handleChange, handleBlur, handleSubmit, values, errors, touched, }) => (
                        <View style={{marginTop: 20}}>

                            <TextInput 
                                placeholder={i18n.t('currentPassword')}  
                                style={global.input} 
                                secureTextEntry={true} 
                                cursorColor={globalColors.gray} 
                                onChangeText={handleChange('currentPassword')}
                                onBlur={handleBlur('currentPassword')}
                                value={values.currentPassword}
                            />
                            {(errors.currentPassword && touched.currentPassword) && (<Text style={{color: 'red'}}>{errors.currentPassword}</Text>)}

                            <TextInput 
                                placeholder={i18n.t('newPassword')}
                                style={global.input} 
                                secureTextEntry={true} 
                                cursorColor={globalColors.gray} 
                                onChangeText={handleChange('newPassword')}
                                onBlur={handleBlur('newPassword')}
                                value={values.newPassword}
                            />
                            {(errors.newPassword && touched.newPassword) && (<Text style={{color: 'red'}}>{errors.newPassword}</Text>)}

                            <TextInput 
                                placeholder={i18n.t('repeatPassword')} 
                                style={global.input} 
                                secureTextEntry={true} 
                                cursorColor={globalColors.gray} 
                                onChangeText={handleChange('newPasswordCfm')}
                                onBlur={handleBlur('newPasswordCfm')}
                                value={values.newPasswordCfm}
                            />
                            {(errors.newPasswordCfm && touched.newPasswordCfm) && (<Text style={{color: 'red'}}>{errors.newPasswordCfm}</Text>)}

                            

                            <CustomButton text={i18n.t('changePassword')} onPressed={handleSubmit} style={{marginTop: 8}} />
                        </View>
                        )}

                        </Formik>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}