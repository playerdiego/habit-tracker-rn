import { View, Text, Alert, Image } from 'react-native';
import React, { useContext, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from './CustomButton';
import { AuthContext } from '../context/AuthContext';

export default function ImagePickerComponent({profilePic, setProfilePic}: 
  {profilePic: null | ImagePicker.ImagePickerResult, 
  setProfilePic: React.Dispatch<React.SetStateAction<ImagePicker.ImagePickerResult | null>>
}) {

    const {user} = useContext(AuthContext);
    

    const pickImage = async (camera: boolean = false) => {
        let result: ImagePicker.ImagePickerResult;
    
        if(camera) {
          result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true,
          })
        } else {
          result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true
          });
        }
    
        if(!result.canceled) {
          setProfilePic(result);
        }
      }
    
      const showPickImageAlert = () => {
        Alert.alert('Open camera or select from media library?', '', [
          {
            text: 'Open Camera',
            style: 'default',
            onPress: () => pickImage(true)
          },
          {
            text: 'Open Media Library',
            style: 'default',
            onPress: () => pickImage()
          },
        ], {cancelable: true});
      }

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
        <Image 
            source={{uri: profilePic?.assets![0].uri || user?.photoURL || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}} 
            style={{height: 120, width: 120, borderRadius: 100}}
        />
        <CustomButton text='Upload Picture' onPressed={showPickImageAlert} outline={true} />
    </View>
  )
}