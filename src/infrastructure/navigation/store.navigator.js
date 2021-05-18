import React from 'react';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { StoresScreen } from '../../features/store/screens/stores.screen';
import { ProductsScreen } from '../../features/store/screens/products.screen';

const StoreStack = createStackNavigator();

export const StoreNavigator = () => {
  return (
    <StoreStack.Navigator
      headerMode='none'
      screenOptions={ { ...TransitionPresets.ModalPresentationIOS } }>
      <StoreStack.Screen
        name='StoresList'
        component={ StoresScreen }
      />
      <StoreStack.Screen
        name='ProductsList'
        component={ ProductsScreen }
      />
    </StoreStack.Navigator>
  )
}