import React, { useContext } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Fontisto } from '@expo/vector-icons';

import { StoreNavigator } from './store.navigator';
import { ProfileNavigator } from './profile.navigator';
import { RepairsNavigator } from './repairs.navigator';
import { MapScreen } from '../../features/map/screens/map.screen';
import { OnboardScreen } from '../../features/onboard/screens/onboard.screen';

import { AuthenticationContext } from '../../services/authentication/authentication.context';
import { StoresContextProvider } from '../../services/stores/stores.context';
import { LocationContextProvider } from '../../services/location/location.context';

import { colors } from '../../infrastructure/theme/colors';

const Tab = createBottomTabNavigator();
const TAB_ICON = {
  Map: 'map-outline',
  Repairs: 'settings-outline',
  Profile: 'person-outline',
}

const createScreenOptions = ({ route }) => {
  if (route.name === 'Store') {
    return {
      tabBarIcon: ({ size, color }) => (
        <Fontisto name='shopping-store' size={ size } color={ color } />
      )
    }
  };
  const iconName = TAB_ICON[ route.name ];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={ iconName } size={ size } color={ color } />
    ),
  }
}

export const AppNavigator = () => {
  const { onboarded } = useContext(AuthenticationContext);

  if (onboarded) {
    return (
      <LocationContextProvider>
        <StoresContextProvider>
          <Tab.Navigator
            screenOptions={ createScreenOptions }
            tabBarOptions={ {
              activeTintColor: colors.brand.primary,
              inactiveTintColor: colors.brand.muted,
            } }>
            <Tab.Screen name="Map" component={ MapScreen } />
            <Tab.Screen name="Store" component={ StoreNavigator } />
            <Tab.Screen name="Repairs" component={ RepairsNavigator } />
            <Tab.Screen name="Profile" component={ ProfileNavigator } />
          </Tab.Navigator>
        </StoresContextProvider>
      </LocationContextProvider>
    )
  }
  return <OnboardScreen />;
}