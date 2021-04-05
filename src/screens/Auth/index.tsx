import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {Api} from '../../services/api';
import Login from './Login';
import {AuthContext} from '../../contexts/AuthContext';
import {BottomTabsNavigator} from '../BottomTabs';
import Loading from '../Loading';
import {Theme} from 'react-native-paper/lib/typescript/types';

const AuthStack = createStackNavigator();

type Props = {
  theme: Theme;
};

const AuthStackScreen = ({theme}: Props) => {
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
    return <BottomTabsNavigator theme={theme} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return !user.isSignedIn ? loginScreen() : loggedScreen();
};

export {AuthStack, AuthStackScreen};
