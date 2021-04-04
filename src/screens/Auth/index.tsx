import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {Api} from '../../services/api';
import Login from './Login';
import {AuthContext} from '../../contexts/AuthContext';
import Loading from '../Loading';
import DrawerNavigator from '../../components/navigation/drawer';
import {Theme} from 'react-native-paper/lib/typescript/types';

const AuthStack = createStackNavigator();

type Props = {
  theme: Theme;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AuthStackScreen = (props: Props) => {
  const {user, signIn, isLoading} = React.useContext(AuthContext);

  React.useEffect(() => {
    Api.configure({refreshCallback: () => signIn(true)});
    signIn(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    return <DrawerNavigator />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return !user.isSignedIn ? loginScreen() : loggedScreen();
};

export {AuthStack, AuthStackScreen};
