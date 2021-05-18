import React from 'react';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { WorkshopsScreen } from '../../features/repairs/screens/workshops.screen';
import { SparePartsScreen } from '../../features/repairs/screens/spare-parts.screen';

const RepairsStack = createStackNavigator();

export const RepairsNavigator = () => {
  return (
    <RepairsStack.Navigator
      headerMode='none'
      screenOptions={ { ...TransitionPresets.ModalPresentationIOS } }>
      <RepairsStack.Screen
        name='Workshops'
        component={ WorkshopsScreen }
      />
      <RepairsStack.Screen
        name='SpareParts'
        component={ SparePartsScreen }
      />
    </RepairsStack.Navigator>
  )
}