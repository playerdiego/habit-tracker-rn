import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { global, globalColors } from '../../../styles/global';
import Title from '../../../components/Title';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { AccountNavigationProps } from '../../../navigation/AccountNavigation';
import * as Yup from 'yup';
import { Formik } from 'formik';
import CustomButton from '../../../components/CustomButton';
import CustomBackButton from '../../../components/CustomBackButton';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import ScrollContainer from '../../../components/ScrollContainer';
import * as ImagePicker from 'expo-image-picker';

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
    }

    const initialValues: FormData = {
        name: user?.displayName!,
        email: user?.email!,
    }

    const onSaveChanges = ({name, email}: FormData) => {
        updateAccount(name, profilePic!)
            .then(() => {
                alert('Account Updated');
                navigate('data');
            })
    }

    const [profilePic, setProfilePic] = useState<null | ImagePicker.ImagePickerResult>(null);

    const pickImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true
      });
  
      if(!result.canceled) {
        setProfilePic(result);
      }
    }

    return (
        <ScrollContainer title='Edit Profile' goBack={() => navigate('data')}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                <Image 
                source={{uri: profilePic?.assets![0].uri || user?.photoURL || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}} 
                style={{height: 120, width: 120, borderRadius: 100}}
                />
                <CustomButton text='Upload Picture' onPressed={pickImage} outline={true} />
            </View>

            <Formik initialValues={initialValues} onSubmit={onSaveChanges} validationSchema={validationSchema}>


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
                    placeholder='Email'  
                    style={global.input}  
                    cursorColor={globalColors.gray} 
                    keyboardType='email-address'
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                />
                {(errors.email && touched.email) && (<Text style={{color: 'red'}}>{errors.email}</Text>)}

                <CustomButton text='Save Changes' onPressed={handleSubmit} style={{marginTop: 8}} />
            </View>
            )}

            </Formik>
        </ScrollContainer>
    )
}