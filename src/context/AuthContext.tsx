import { createContext, useState } from "react";
import React from 'react';
import {initializeApp} from 'firebase/app'
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';
import {getAuth, createUserWithEmailAndPassword, UserCredential, User, signOut, signInWithEmailAndPassword, updateCurrentUser, updateProfile, sendPasswordResetEmail, sendEmailVerification, updateEmail} from 'firebase/auth';
import { firebaseConfig } from "../../firebase-config";
import * as ImagePicker from 'expo-image-picker';


interface AuthContextProps {
  user: User | undefined,
  registerWithEmail: (name: string, email: string, password: string, profilePic?: ImagePicker.ImagePickerResult) => UserCredential | any,
  loginWithEmail: (email: string, password: string) => UserCredential | any,
  logout: () => void,
  recoverAccount: (email:string) => void,
  reSendValidationEmail: () => void,
  updateAccount: (name: string, email: string, profilePic: ImagePicker.ImagePickerResult) => Promise<void>,
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const storage = getStorage();

  const [user, setUser] = useState<User>();


  const registerWithEmail = (name: string, email: string, password: string, profilePic?: ImagePicker.ImagePickerResult): UserCredential | any => {

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
  }

  
  const loginWithEmail = (email: string, password: string): UserCredential | any => {
    
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setUser(userCredential.user);
      console.log(userCredential.user);
      return userCredential;
    })
    .catch((error) => {
      alert(error);
      return error;
    });
    
  }
  
  const logout = () => {
    signOut(auth)
      .catch((error) => {
        alert(error);
        console.error(error);
      })
  }

  const recoverAccount = (email: string) => {

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Email sent, check your inbox');
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      })

  }

  const reSendValidationEmail = () => {
    sendEmailVerification(auth.currentUser!)
      .then(() => alert('Verification email sent, check your inbox ' + auth.currentUser?.email))
      .catch(error => {
        alert(error);
        console.error(error);
      })
  }

  const updateAccount = async (name: string, email?: string, profilePic?: ImagePicker.ImagePickerResult,) => {

    let profilePicUrl = null;

    if(profilePic) {
      profilePicUrl = await uploadFile(profilePic, auth.currentUser!.uid);
    }

    const finalUser: User = {
      ...auth.currentUser!, 
      displayName: name,
      photoURL: profilePicUrl!
    }

    updateProfile(auth.currentUser!, finalUser);
    if(email && email !== auth.currentUser?.email) {
      updateEmail(auth.currentUser!, email);
      reSendValidationEmail();
    }
    
    setUser(finalUser);

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

  return (
    <AuthContext.Provider value={{
      user,
      registerWithEmail,
      loginWithEmail,
      logout,
      recoverAccount,
      reSendValidationEmail,
      updateAccount
    }}>
        {children}
    </AuthContext.Provider>
  )
}