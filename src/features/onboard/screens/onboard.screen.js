import React, { useContext } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import ViewPager from '@react-native-community/viewpager';

import { AuthenticationContext } from '../../../services/authentication/authentication.context';

export const OnboardScreen = () => {
  const { onOnboard } = useContext(AuthenticationContext);

  return (
    <View style={ { flex: 1 } }>
      <ViewPager style={ styles.viewPager } initialPage={ 0 }>
        <View style={ styles.page } key="1">
          <Text>Welcome to WiBIKE!</Text>
          <Text>Swipe ➡️</Text>
          <Button title='skip' onPress={ onOnboard }>Skip</Button>
        </View>
        <View style={ styles.page } key="2">
          <Text>Second page</Text>
        </View>
        <View style={ styles.page } key="3">
          <Text>Third page</Text>
          <Button title='continue' onPress={ onOnboard }>continue</Button>
        </View>
      </ViewPager>
    </View>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
