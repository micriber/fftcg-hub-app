import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {Api} from '../../services/api';
import Login from './Login';
import {AuthContext} from '../../contexts/AuthContext';
import Loading from '../Loading';
import DrawerNavigator from '../../components/navigation/drawer';

const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
  const {user, signIn, isLoading, signOut} = React.useContext(AuthContext);

  React.useEffect(() => {
    Api.configure({refreshCallback: () => signIn(true)});
    signIn(true);
  }, [signIn]);

  function loginScreen() {
    return (
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <AuthStack.Screen name="Login" component={Login} />
      </AuthStack.Navigator>
    );
  }

  function loggedScreen() {
    return <DrawerNavigator signOut={signOut} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return !user.isSignedIn ? loginScreen() : loggedScreen();
};

export {AuthStack, AuthStackScreen};
