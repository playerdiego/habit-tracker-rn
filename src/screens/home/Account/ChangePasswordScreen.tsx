import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { global } from '../../../styles/global';
import Title from '../../../components/Title';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { AccountNavigationProps } from '../../../navigation/AccountNavigation';
import * as Yup from 'yup';
import { Formik } from 'formik';
import CustomButton from '../../../components/CustomButton';

export default function ChangePasswordScreen() {

    const {navigate} = useNavigation<AccountNavigationProps>();

    const validationSchema = Yup.object().shape({
        currentPassword: Yup.string().required('Your current password is required'),
        newPassword: Yup.string().required('New Password is required'),
        newPasswordCfm: Yup.string().required('Confirm New Password is required'),
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

    const onChangePassword = () => {

    }

    return (
        <SafeAreaView edges={['top']}>
            <ScrollView style={{height: '100%'}}>


                <View style={global.container}>

                    <TouchableOpacity style={{marginBottom: 40}}>
                        <Icon name='arrow-left' onPress={() => navigate('data')} />
                    </TouchableOpacity>
                    
                    <Title>Change Password</Title>

                    <Formik initialValues={initialValues} onSubmit={onChangePassword} validationSchema={validationSchema}>

                        {({handleChange, handleBlur, handleSubmit, values, errors, touched, }) => (
                        <View style={{marginTop: 20}}>

                            <TextInput 
                                placeholder='Your current password'  
                                style={global.input} 
                                secureTextEntry={true} 
                                cursorColor='#222' 
                                onChangeText={handleChange('currentPassword')}
                                onBlur={handleBlur('currentPassword')}
                                value={values.currentPassword}
                            />
                            {(errors.currentPassword && touched.currentPassword) && (<Text style={{color: 'red'}}>{errors.currentPassword}</Text>)}

                            <TextInput 
                                placeholder='New Password'  
                                style={global.input} 
                                secureTextEntry={true} 
                                cursorColor='#222' 
                                onChangeText={handleChange('newPassword')}
                                onBlur={handleBlur('newPassword')}
                                value={values.newPassword}
                            />
                            {(errors.newPassword && touched.newPassword) && (<Text style={{color: 'red'}}>{errors.newPassword}</Text>)}

                            <TextInput 
                                placeholder='Confirm New Password'  
                                style={global.input} 
                                secureTextEntry={true} 
                                cursorColor='#222' 
                                onChangeText={handleChange('newPasswordCfm')}
                                onBlur={handleBlur('newPasswordCfm')}
                                value={values.newPasswordCfm}
                            />
                            {(errors.newPasswordCfm && touched.newPasswordCfm) && (<Text style={{color: 'red'}}>{errors.newPasswordCfm}</Text>)}

                            

                            <CustomButton text='Change Password' onPressed={handleSubmit} style={{marginTop: 8}} />
                        </View>
                        )}

                        </Formik>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}