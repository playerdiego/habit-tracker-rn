import { View, Text, TextInput, Alert } from 'react-native';
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
import { UIContext } from '../../../context/UIContext';

export default function EditAccountScreen() {

    const {navigate} = useNavigation<AccountNavigationProps>();
    const {i18n} = useContext(UIContext);

    const {user, updateAccount} = useContext(AuthContext);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(i18n.t('nameRequired')),
        email: Yup.string().email(i18n.t('invalidEmail')).required(i18n.t('emailRequired')),
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
        Alert.alert(i18n.t('uSuer'), i18n.t('profileWillUpdated'), [
            {   
                text: i18n.t('cancel'),
                style: 'cancel'
            },
            {
                text: i18n.t('confirm'),
                onPress: () => onSaveChanges({name, email, password}),
                style: 'destructive'
            },
        ], {cancelable: true});
    }

    return (
        <ScrollContainer title={i18n.t('editProfile')} goBack={() => navigate('data')}>
            
            <ImagePickerComponent profilePic={profilePic} setProfilePic={setProfilePic} />

            <Formik initialValues={initialValues} onSubmit={showConfirmEditAlert} validationSchema={validationSchema}>


            {({handleChange, handleBlur, handleSubmit, values, errors, touched, }) => (
            <View style={{marginTop: 20}}>

                <TextInput 
                    placeholder={i18n.t('yourName')}
                    style={global.input}  
                    cursorColor={globalColors.gray} 
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
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

                <Title size='xs'>{i18n.t('forYourSecurity')}</Title>

                <TextInput 
                    placeholder={i18n.t('password')} 
                    secureTextEntry={true} 
                    style={global.input} 
                    cursorColor={globalColors.gray}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                />

                <CustomButton text={i18n.t('saveChanges')} onPressed={handleSubmit} style={{marginTop: 8}} />
            </View>
            )}

            </Formik>
        </ScrollContainer>
    )
}