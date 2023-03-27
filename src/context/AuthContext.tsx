import { createContext, useState } from "react";
import React from 'react';

import {initializeApp} from 'firebase/app'
import {getAuth, createUserWithEmailAndPassword, UserCredential, User, signOut, signInWithEmailAndPassword, updateCurrentUser, updateProfile, sendPasswordResetEmail, sendEmailVerification} from 'firebase/auth';
import { firebaseConfig } from "../../firebase-config";

interface AuthContextProps {
  user: User | undefined,
  registerWithEmail: (name: string, email: string, password: string) => UserCredential | any,
  loginWithEmail: (email: string, password: string) => UserCredential | any,
  logout: () => void,
  recoverAccount: (email:string) => void,
  reSendValidationEmail: () => void,
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();

  const [user, setUser] = useState<User>();


  const registerWithEmail = (name: string, email: string, password: string): UserCredential | any => {

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {...userCredential.user, displayName: name});
        setUser({...userCredential.user, displayName: name});
        console.log({...userCredential.user, displayName: name});

        sendEmailVerification(userCredential.user)
          .then(() => alert('Verification email sent, check your inbox'))
          .catch(error => {
            alert(error);
            console.error(error);
          });

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

  return (
    <AuthContext.Provider value={{
      user,
      registerWithEmail,
      loginWithEmail,
      logout,
      recoverAccount,
      reSendValidationEmail
    }}>
        {children}
    </AuthContext.Provider>
  )
}