import { View, Text, TextInput, Image, Alert } from 'react-native';
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';

import { global, globalColors } from '../../../styles/global';
import { AccountNavigationProps } from '../../../navigation/AccountNavigation';
import CustomButton from '../../../components/CustomButton';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import ScrollContainer from '../../../components/ScrollContainer';
import ImagePickerComponent from '../../../components/ImagePickerComponent';
import Title from '../../../components/Title';

export default function EditAccountScreen() {

    const {navigate} = useNavigation<AccountNavigationProps>();

    const {user, updateAccount} = useContext(AuthContext);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Your name is required'),
        email: Yup.string().email('Invalid Email').required('Email is required'),
      });

    type FormData = {
        name: string,
        email: string,
        password: ''
    }

    const initialValues: FormData = {
        name: user?.displayName!,
        email: user?.email!,
        password: ''
    }

    const onSaveChanges = async ({name, email, password}: FormData) => {
        await updateAccount(name, email, password, profilePic!);
    }

    const [profilePic, setProfilePic] = useState<null | ImagePicker.ImagePickerResult>(null);

    const showConfirmEditAlert = ({name, email, password}: FormData) => {
        Alert.alert('Are you sure?', 'Your profile will be updated', [
            {   
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Confirm',
                onPress: () => onSaveChanges({name, email, password}),
                style: 'destructive'
            },
        ], {cancelable: true});
    }

    return (
        <ScrollContainer title='Edit Profile' goBack={() => navigate('data')}>
            
            <ImagePickerComponent profilePic={profilePic} setProfilePic={setProfilePic} />

            <Formik initialValues={initialValues} onSubmit={showConfirmEditAlert} validationSchema={validationSchema}>


            {({handleChange, handleBlur, handleSubmit, values, errors, touched, }) => (
            <View style={{marginTop: 20}}>

                <TextInput 
                    placeholder='Your Name'  
                    style={global.input}  
                    cursorColor={globalColors.gray} 
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
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

                <Title size='xs'>For your security, type your password</Title>

                <TextInput 
                    placeholder='Your password' 
                    secureTextEntry={true} 
                    style={global.input} 
                    cursorColor={globalColors.gray}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                />

                <CustomButton text='Save Changes' onPressed={handleSubmit} style={{marginTop: 8}} />
            </View>
            )}

            </Formik>
        </ScrollContainer>
    )
}