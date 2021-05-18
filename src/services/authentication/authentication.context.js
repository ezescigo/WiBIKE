import React, { useState, createContext } from 'react';
import * as firebase from "firebase";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ user, setUser ] = useState(null);
  const [ error, setError ] = useState(null);
  const [ onboarded, setOnboarded ] = useState(false);
  const [ isGuest, setIsGuest ] = useState(false);

  firebase.auth().onAuthStateChanged((usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onOnboard = () => {
    setOnboarded(true);
  };

  const onGuest = () => {
    setIsGuest(true);
  };

  const onLogin = (email, password) => {
    setIsLoading(true);
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setUser(userCredential);
        setIsLoading(false);
      }).catch((err) => {
        setIsLoading(false);
        setError(err.toString());
      });
  };

  const onRegister = (email, password, repeatedPassword) => {
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match.")
      return;
    };
    setIsLoading(true);
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setUser(userCredential);
        setIsLoading(false);
      }).catch((err) => {
        setIsLoading(false);
        setError(err.toString());
      });
  };

  const onLogout = () => {
    setUser(null);
    setIsGuest(false);
    firebase.auth().signOut();
  }

  return (
    <AuthenticationContext.Provider
      value={ {
        onboarded,
        isGuest,
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onOnboard,
        onLogin,
        onRegister,
        onLogout,
        onGuest,
      } }>
      {children }
    </AuthenticationContext.Provider>
  )
};