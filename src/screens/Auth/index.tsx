import {createStackNavigator} from '@react-navigation/stack';
import Login from './Login';
import * as React from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {Theme} from '@react-navigation/native';
import {BottomTabsNavigator} from '../BottomTabs';
import Loading from '../Loading';

const AuthStack = createStackNavigator();

type Props = {
  theme: Theme;
};

const AuthStackScreen = ({theme}: Props) => {
  const {user, signIn, isLoading} = React.useContext(AuthContext);

  React.useEffect(() => {
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

  return isLoading ? (
    <Loading />
  ) : !user.isSignedIn ? (
    loginScreen()
  ) : (
    loggedScreen()
  );
};

export {AuthStack, AuthStackScreen};
