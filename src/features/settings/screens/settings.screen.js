import React, { useState, useContext, useCallback } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { List, Avatar } from 'react-native-paper';

import { Text } from '../../../components/typography/text.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { SafeArea } from '../../../components/utilities/safe-area.component';

import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { colors } from '../../../infrastructure/theme/colors';
import { useFocusEffect } from '@react-navigation/core';

const SettingsBackground = styled.ImageBackground.attrs({
  source: require('../../../../assets/home_bg.jpg')
})`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const SettingsCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
`;

const TransparentSafeArea = styled(SafeArea)`
  background-color: transparent;
`;

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[ 3 ]};
  background-color: rgba(255,255,255,0.6);
`;

const AvatarContainer = styled.View`
  padding-top: ${(props) => props.theme.space[ 4 ]};
  align-items: center;
`;

export const SettingsScreen = ({ navigation }) => {
  const { isGuest, user, onLogout } = useContext(AuthenticationContext);
  const [ photo, setPhoto ] = useState(null);

  const getProfilePicture = async (currentUser) => {
    const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
    setPhoto(photoUri);
  };

  useFocusEffect(
    useCallback(() => {
      if (!isGuest) {
        getProfilePicture(user);
      }
    }, [ user, isGuest ])
  );

  return (
    <SettingsBackground>
      <SettingsCover />
      <TransparentSafeArea>
        <TouchableOpacity onPress={ () => navigation.navigate('Camera') }>
          <AvatarContainer>
            { !photo && <Avatar.Icon size={ 180 } icon='account-circle' backgroundColor={ colors.brand.primary } /> }
            { photo && <Avatar.Image size={ 180 } source={ { uri: photo } } backgroundColor='#2182BD' /> }
            <Spacer position='top' size='large'>
              { user
                ? <Text variant='label'>{ user.email }</Text>
                : <TouchableWithoutFeedback
                  onPress={ onLogout }
                >
                  <Text variant='label'>Login to your account.</Text>
                </TouchableWithoutFeedback>
              }
            </Spacer>
          </AvatarContainer>
        </TouchableOpacity>
        <List.Section>
          <SettingsItem
            title='Favorites'
            description='View your favorites'
            left={ (props) => <List.Icon { ...props } color={ colors.ui.error } icon='heart' /> }
            onPress={ () => navigation.navigate('Favorites') }
          />
          <Spacer />
          <SettingsItem
            title='Payment'
            left={ (props) => <List.Icon { ...props } color={ colors.ui.secondary } icon='cart' /> }
            onPress={ () => null }
          />
          <Spacer />
          <SettingsItem
            title='Past Orders'
            left={ (props) => <List.Icon { ...props } color={ colors.ui.secondary } icon='history' /> }
            onPress={ () => null }
          />
          <Spacer />
          <SettingsItem
            title='Logout'
            left={ (props) => <List.Icon { ...props } color={ colors.ui.secondary } icon='door' /> }
            onPress={ onLogout }
          />
        </List.Section>
      </TransparentSafeArea>
    </SettingsBackground>
  )
};