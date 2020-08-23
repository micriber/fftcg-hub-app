import {createStackNavigator} from '@react-navigation/stack';
import Login from './Login';
import * as React from 'react';

const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <AuthStack.Screen name="Login" component={Login} />
  </AuthStack.Navigator>
);

export {AuthStack, AuthStackScreen};
