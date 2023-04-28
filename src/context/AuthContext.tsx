import React, { createContext, useContext, useState } from 'react';
import {initializeApp} from 'firebase/app'
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';
import {getAuth, createUserWithEmailAndPassword, UserCredential, User, signOut, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail, sendEmailVerification, updateEmail, reauthenticateWithCredential, updatePassword, AuthCredential, EmailAuthProvider} from 'firebase/auth';
import { firebaseConfig } from "../../firebase-config";
import * as ImagePicker from 'expo-image-picker';
import { UIContext } from './UIContext';
import { useNavigation } from '@react-navigation/native';
import { AccountNavigationProps } from '../navigation/AccountNavigation';
import { SaveFormat, manipulateAsync } from 'expo-image-manipulator';


interface AuthContextProps {
  user: User | null,
  registerWithEmail: (name: string, email: string, password: string, profilePic?: ImagePicker.ImagePickerResult) => UserCredential | any,
  loginWithEmail: (email: string, password: string) => UserCredential | any,
  logout: () => void,
  recoverAccount: (email:string) => void,
  reSendValidationEmail: (email?: string) => void,
  updateAccount: (name: string, email: string, password: string, profilePic: ImagePicker.ImagePickerResult) => Promise<void>,
  changePassword: (newPassword: string, password: string) => Promise<void>, 
}

/* 
TODO:  Implementar login con google
*/

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const storage = getStorage();

  const {navigate: navigateAccount} = useNavigation<AccountNavigationProps>();

  const {setLoading, i18n, getErrorMessage} = useContext(UIContext);

  const [user, setUser] = useState<User | null>(null);

  const registerWithEmail = (name: string, email: string, password: string, profilePic?: ImagePicker.ImagePickerResult): UserCredential | any => {

    setLoading(i18n.t('creatingAccount'))

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {

        sendEmailVerification(userCredential.user)
          .then(() => alert(i18n.t('verificationSent')))
          .catch(error => {
            alert(error);
            console.error(error);
          });

        await updateAccount(name, email, password, profilePic);

        return userCredential;
      })
      .catch((error) => {
        alert(getErrorMessage(error.code));
        return error;
      })
      .finally(() => {
        setLoading(null);
      })


  }

  
  const loginWithEmail = (email: string, password: string): Promise<UserCredential> | any => {

    setLoading(i18n.t('loggingIn'));
    
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setUser(userCredential.user);
      return userCredential;
    })
    .catch((error) => {
      alert(getErrorMessage(error.code));
      console.error(error);
    })
    .finally(() => {
      setLoading(null);
    });
    
  }
  
  const logout = () => {
    setLoading(i18n.t('loggingOut'));
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        alert(getErrorMessage(error.code));
        console.error(error);
      })
      .finally(() => {
        setLoading(null);
      })
  }

  const recoverAccount = (email: string) => {

    setLoading(i18n.t('sendingRecover'));

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert(i18n.t('emailSent'));
      })
      .catch((error) => {
        alert(getErrorMessage(error.code));
        console.error(error);
      })
      .finally(() => {
        setLoading(null);
      })
  }

  const reSendValidationEmail = (email: string = auth.currentUser?.email!) => {
    setLoading(i18n.t('sendingValidation'));
    sendEmailVerification(auth.currentUser!)
      .then(() => {
        alert(i18n.t('verificationSent') + ' ' + email);
      })
      .catch(error => {
        alert(getErrorMessage(error.code));
        console.error(error);
      })
      .finally(() => {
        setLoading(null);
      })
  }

  const updateAccount = async (name: string, email: string, password: string, profilePic?: ImagePicker.ImagePickerResult,) => {

    setLoading(i18n.t('updatingAccount'))

    const credential = EmailAuthProvider.credential(auth.currentUser?.email!, password);
    
    return reauthenticateWithCredential(auth.currentUser!, credential)
      .then(async () => {

        let profilePicUrl = null;

        if(profilePic) {
          profilePicUrl = await uploadFile(profilePic, auth.currentUser!.uid)
            .catch(error => {
              alert(getErrorMessage(error.code));
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
              setLoading(i18n.t('updatingEmail'))
              updateEmail(auth.currentUser!, email)
                .then(() => {
                  finalUser = {...finalUser, email}
                })
                .catch(error => {
                  alert(getErrorMessage(error.code));
                  console.error(error);
                })
              reSendValidationEmail(email);
              setUser({...auth.currentUser!, email});
            } else {
              setUser(auth.currentUser);
            }
          })
          .finally(() => {
            if(user) {
              navigateAccount('data');
            }
          })
      

      })
      .catch(error => {
        alert(getErrorMessage(error.code));
        alert(error);
      })
      .finally(() => {
        setLoading(null);
      })

    
  }

  const uploadFile = async (profilePic: ImagePicker.ImagePickerResult, uid: string) => {

    const resized = await manipulateAsync(profilePic!.assets![0].uri,
      [{resize: {width: 500, height: 500},}],
      {compress: 0.5, format: SaveFormat.WEBP}
    );

    const fileRef = ref(storage, uid);

    return fetch(resized.uri)
      .then(response => response.blob())
      .then(blobFile => uploadBytes(fileRef, blobFile))
      .then(result => getDownloadURL(result.ref))
      .catch(error => {
        alert(getErrorMessage(error.code));
        alert(error);
      })
    
  }

  const changePassword = (newPassword: string, password: string) => {

    setLoading(i18n.t('updatingPassword'))

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
        alert(getErrorMessage(error.code));
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