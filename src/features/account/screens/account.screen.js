import React, { useContext } from 'react';
import LottieView from 'lottie-react-native';

import { Spacer } from '../../../components/spacer/spacer.component';
import {
  AccountBackground,
  AccountCover,
  AnimationWrapper,
  AccountContainer,
  AuthButton,
  Title,
} from '../components/account.styles';

import { AuthenticationContext } from '../../../services/authentication/authentication.context';

export const AccountScreen = ({ navigation }) => {
  const { onGuest } = useContext(AuthenticationContext);

  return (
    <AccountBackground>
      <AccountCover />
      <AnimationWrapper>
        <LottieView
          key='animation'
          autoPlay
          loop
          resizeMode='cover'
          source={ require('../../../../assets/home_bike.json') }
        />
      </AnimationWrapper>
      <Title>WiBIKE</Title>
      <AccountContainer>
        <AuthButton
          icon='lock-open-outline'
          title='login'
          mode='contained'
          onPress={ () => navigation.navigate('login') }
        >
          Login
        </AuthButton>
        <Spacer size='large'>
          <AuthButton
            icon='email'
            title='register'
            mode='contained'
            onPress={ () => navigation.navigate('register') }
          >
            Sign Up
          </AuthButton>
        </Spacer>
        <Spacer size='large'>
          <AuthButton
            title='guest'
            mode='contained'
            onPress={ () => onGuest() }
          >
            Login as a Guest
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  )
};