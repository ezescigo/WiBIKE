import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import { SettingsScreen } from '../../features/settings/screens/settings.screen';
import { FavoritesScreen } from '../../features/settings/screens/favorites.screen';
import { CameraScreen } from '../../features/settings/screens/camera.screen';

const ProfileStack = createStackNavigator();

export const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      headerMode='screen'
      screenOptions={ {
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      } }
    >
      <ProfileStack.Screen
        options={ {
          header: () => null,
        } }
        name='Settings'
        component={ SettingsScreen }
      />
      <ProfileStack.Screen name='Camera' component={ CameraScreen } />
    </ProfileStack.Navigator>
  )
}