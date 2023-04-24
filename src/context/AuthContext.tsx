import React, { createContext, useContext, useState } from 'react';
import {initializeApp} from 'firebase/app'
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';
import {getAuth, createUserWithEmailAndPassword, UserCredential, User, signOut, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail, sendEmailVerification, updateEmail, reauthenticateWithCredential, updatePassword, AuthCredential, EmailAuthProvider} from 'firebase/auth';
import { firebaseConfig } from "../../firebase-config";
import * as ImagePicker from 'expo-image-picker';
import { UIContext } from './UIContext';
import { useNavigation } from '@react-navigation/native';
import { AccountNavigationProps } from '../navigation/AccountNavigation';


interface AuthContextProps {
  user: User | null,
  registerWithEmail: (name: string, email: string, password: string, profilePic?: ImagePicker.ImagePickerResult) => UserCredential | any,
  loginWithEmail: (email: string, password: string) => UserCredential | any,
  logout: () => void,
  recoverAccount: (email:string) => void,
  reSendValidationEmail: () => void,
  updateAccount: (name: string, email: string, profilePic: ImagePicker.ImagePickerResult) => Promise<void>,
  changePassword: (newPassword: string, password: string) => Promise<void>, 
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const storage = getStorage();

  const {navigate: navigateAccount} = useNavigation<AccountNavigationProps>();

  const {setLoading} = useContext(UIContext);

  const [user, setUser] = useState<User | null>(null);


  const registerWithEmail = (name: string, email: string, password: string, profilePic?: ImagePicker.ImagePickerResult): UserCredential | any => {

    setLoading('Creating account...')

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {

        sendEmailVerification(userCredential.user)
          .then(() => alert('Verification email sent, check your inbox'))
          .catch(error => {
            alert(error);
            console.error(error);
          });

        await updateAccount(name, email, profilePic);

        return userCredential;
      })
      .catch((error) => {
        alert(error);
        return error;
      })
      .finally(() => {
        setLoading(null);
      })


  }

  
  const loginWithEmail = (email: string, password: string): Promise<UserCredential> | any => {

    setLoading('Logging in...');
    
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setUser(userCredential.user);
      return userCredential;
    })
    .catch((error) => {
      alert(error);
      return error;
    })
    .finally(() => {
      setLoading(null);
    });
    
  }
  
  const logout = () => {
    setLoading('Logging out...');
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      })
      .finally(() => {
        setLoading(null);
      })
  }

  const recoverAccount = (email: string) => {

    setLoading('Sending recover email...');

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Email sent, check your inbox');
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      })
      .finally(() => {
        setLoading(null);
      })
  }

  const reSendValidationEmail = () => {
    setLoading('Sending validation email...');
    sendEmailVerification(auth.currentUser!)
      .then(() => {
        alert('Verification email sent, check your inbox ' + auth.currentUser?.email);
      })
      .catch(error => {
        alert(error);
        console.error(error);
      })
      .finally(() => {
        setLoading(null);
      })
  }

  const updateAccount = async (name: string, email: string, profilePic?: ImagePicker.ImagePickerResult,) => {

    setLoading('Updating account info...')

    let profilePicUrl = null;

    if(profilePic) {
      profilePicUrl = await uploadFile(profilePic, auth.currentUser!.uid)
        .catch(error => {
          alert(error);
          console.error(error);
        });
    }

    let finalUser: User = {
      ...user!, 
      displayName: name,
      photoURL: profilePicUrl!
    }

    updateProfile(auth.currentUser!, finalUser)
      .then(() => {
        if(email !== auth.currentUser?.email) {
          setLoading('Updating email...')
          updateEmail(auth.currentUser!, email)
            .then(() => {
              finalUser = {...finalUser, email}
            })
            .catch(error => {
              alert(error);
              console.error(error);
            })
          reSendValidationEmail();
          setUser({...auth.currentUser!, email});
        }
      })
      .finally(() => {
        setLoading(null);
        if(user) {
          navigateAccount('data');
        }
      })
      
      setUser(auth.currentUser);
  }

  const uploadFile = (profilePic: ImagePicker.ImagePickerResult, uid: string) => {

    const fileRef = ref(storage, uid);

    return fetch(profilePic.assets![0].uri)
      .then(response => response.blob())
      .then(blobFile => uploadBytes(fileRef, blobFile))
      .then(result => getDownloadURL(result.ref))
      .catch(error => {
        console.error(error);
        alert(error);
      })
    
  }

  const changePassword = (newPassword: string, password: string) => {

    setLoading('Updating password...')

    const credential = EmailAuthProvider.credential(auth.currentUser?.email!, password);
    
    return reauthenticateWithCredential(auth.currentUser!, credential)
      .then(userCredential => {
        updatePassword(userCredential.user, newPassword)
          .then(() => {
            if(user) {
              navigateAccount('data');
            }
          })

      })
      .catch(error => {
        console.log(error);
        alert(error);
      })
      .finally(() => {
        setLoading(null);
      })

  }

  return (
    <AuthContext.Provider value={{
      user,
      registerWithEmail,
      loginWithEmail,
      logout,
      recoverAccount,
      reSendValidationEmail,
      updateAccount,
      changePassword
    }}>
        {children}
    </AuthContext.Provider>
  )
}