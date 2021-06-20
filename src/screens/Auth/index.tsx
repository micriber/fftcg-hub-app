import * as React from 'react';

import {Api} from '../../services/api';
import Login from './Login';
import {AuthContext} from '../../contexts/AuthContext';
import Loading from '../Loading';
import DrawerNavigator from '../../components/navigation/drawer';

type Props = {
  userLogin: (userIsLogged: boolean) => void;
};

const Auth = ({userLogin}: Props) => {
  const {user, signIn, isLoading, signOut} = React.useContext(AuthContext);
  const [needUpgrade, setNeedUpgrade] = React.useState(false);

  React.useEffect(() => {
    Api.configure({
      refreshCallback: () => signIn(true),
      upgradeCallback: () => {
        signOut();
        setNeedUpgrade(true);
      },
    });
    signIn(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function loginScreen() {
    setTimeout(() => {
      userLogin(false);
    }, 0);
    return <Login upgrade={false} />;
  }

  function loggedScreen() {
    setTimeout(() => {
      userLogin(true);
    }, 0);
    return <DrawerNavigator signOut={signOut} />;
  }

  if (needUpgrade) {
    return <Login upgrade={true} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return !user.isSignedIn ? loginScreen() : loggedScreen();
};

export default Auth;
