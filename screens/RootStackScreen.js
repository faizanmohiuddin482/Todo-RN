import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SignInScreen from './SignInScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
  </RootStack.Navigator>
);

export default RootStackScreen;
