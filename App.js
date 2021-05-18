import React, { useState, useEffect } from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import * as firebase from 'firebase';

import { useFonts as useOswald, Oswald_400Regular } from '@expo-google-fonts/oswald';
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';

import { theme } from './src/infrastructure/theme';
import { Navigation } from './src/infrastructure/navigation/index';

import { AuthenticationContextProvider } from './src/services/authentication/authentication.context';

const firebaseConfig = {
  apiKey: "AIzaSyCi4IXVZqLvBYi-PXV6bIYbUzP6ycvhpIs",
  authDomain: "wibike-621e7.firebaseapp.com",
  projectId: "wibike-621e7",
  storageBucket: "wibike-621e7.appspot.com",
  messagingSenderId: "964245939170",
  appId: "1:964245939170:web:defa94c6ddbf377b014fbb"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log('firebase connected')
}

export default function App () {

  const [ oswaldLoaded ] = useOswald({
    Oswald_400Regular,
  });

  const [ latoLoaded ] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  };

  return (
    <>
      <ThemeProvider theme={ theme }>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style='auto' />
    </>
  );
}


