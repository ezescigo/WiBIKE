import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppNavigator } from './app.navigator';
import { AccountNavigator } from './account.navigator';

import { AuthenticationContext } from '../../services/authentication/authentication.context';

export const Navigation = () => {
  const { isGuest, isAuthenticated, onboarded } = useContext(AuthenticationContext);
  console.log(onboarded);
  return (
    <NavigationContainer>
      {(isAuthenticated || isGuest)
        ? <AppNavigator />
        : <AccountNavigator />
      }
    </NavigationContainer>
  )

};