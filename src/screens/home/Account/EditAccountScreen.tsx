import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { global, globalColors } from '../../../styles/global';
import Title from '../../../components/Title';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { AccountNavigationProps } from '../../../navigation/AccountNavigation';
import * as Yup from 'yup';
import { Formik } from 'formik';
import CustomButton from '../../../components/CustomButton';

export default function EditAccountScreen() {

    const {navigate} = useNavigation<AccountNavigationProps>();

    const validationSchema = Yup.object().shape({
        currentPassword: Yup.string().required('Your current password is required'),
        newPassword: Yup.string().required('New Password is required'),
        newPasswordCfm: Yup.string().required('Confirm New Password is required'),
      });

    type FormData = {
        username: string,
        email: string,
        phrase: string
    }

    const initialValues: FormData = {
        username: '',
        email: '',
        phrase: ''
    }

    const onSaveChanges = () => {

    }

    return (
        <SafeAreaView edges={['top']}>
            <ScrollView style={{height: '100%'}}>


                <View style={global.container}>

                    <TouchableOpacity style={{marginBottom: 40}}>
                        <Icon name='arrow-left' onPress={() => navigate('data')} />
                    </TouchableOpacity>
                    
                    <Title>Edit Account</Title>

                    <Formik initialValues={initialValues} onSubmit={onSaveChanges} validationSchema={validationSchema}>

                        {({handleChange, handleBlur, handleSubmit, values, errors, touched, }) => (
                        <View style={{marginTop: 20}}>

                            <TextInput 
                                placeholder='Username'  
                                style={global.input}  
                                cursorColor={globalColors.gray} 
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                            {(errors.username && touched.username) && (<Text style={{color: 'red'}}>{errors.username}</Text>)}

                            <TextInput 
                                placeholder='Email'  
                                style={global.input}  
                                cursorColor={globalColors.gray} 
                                keyboardType='email-address'
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                            {(errors.email && touched.email) && (<Text style={{color: 'red'}}>{errors.email}</Text>)}

                            <TextInput 
                                placeholder='Motivational Phrase'  
                                style={global.input}  
                                cursorColor={globalColors.gray} 
                                onChangeText={handleChange('phrase')}
                                onBlur={handleBlur('phrase')}
                                value={values.phrase}
                            />
                            {(errors.phrase && touched.phrase) && (<Text style={{color: 'red'}}>{errors.phrase}</Text>)}


                            

                            <CustomButton text='Save Changes' onPressed={handleSubmit} style={{marginTop: 8}} />
                        </View>
                        )}

                        </Formik>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}