import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { AccountScreen } from '../../features/account/screens/account.screen';
import { LoginScreen } from '../../features/account/screens/login.screen';
import { RegisterScreen } from '../../features/account/screens/register.screen';

const AccountStack = createStackNavigator();

export const AccountNavigator = () => {
  return (
    <AccountStack.Navigator headerMode='none'>
      <AccountStack.Screen name='main' component={ AccountScreen }>
      </AccountStack.Screen>
      <AccountStack.Screen name='login' component={ LoginScreen }>
      </AccountStack.Screen>
      <AccountStack.Screen name='register' component={ RegisterScreen }>
      </AccountStack.Screen>
    </AccountStack.Navigator>
  )
}