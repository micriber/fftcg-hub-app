import React from 'react';
import {Alert} from 'react-native';
import {Api} from '../services/api';
import {googleLogin, UserInfo} from '../services/api/user';
import {signOut} from '../services/google';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {AuthContext} from './AuthContext';

type UserState = {
  isSignedIn: boolean;
  info?: UserInfo;
  idToken?: string;
};

const AuthContextProvider = ({children}) => {
  const [user, setUser] = React.useState<UserState>({isSignedIn: false});
  const [isLoading, setIsLoading] = React.useState(true);

  const authContext = React.useMemo(() => {
    return {
      user,
      isLoading,
      getCurrentUser: () => {
        if (!user.isSignedIn || !user.info) {
          return null;
        }

        return user.info;
      },
      getIdToken: () => {
        if (!user.isSignedIn || !user.idToken) {
          return null;
        }

        return user.idToken;
      },
      getTokens: async () => {
        return await GoogleSignin.getTokens();
      },
      signIn: async (silently = false) => {
        setIsLoading(true);
        await GoogleSignin.hasPlayServices();
        let userInfo;
        try {
          userInfo = silently
            ? await GoogleSignin.signInSilently()
            : await GoogleSignin.signIn();
        } catch (e) {
          console.log({debug: 1, code: e.code});

          if (e.code === statusCodes.SIGN_IN_REQUIRED) {
            setIsLoading(false);
            return;
          }

          console.log(e);
        }

        const idToken = userInfo?.idToken;

        console.log({debug: 2, idToken, userInfo});

        if (!idToken || userInfo?.serverAuthCode === statusCodes.SIGN_IN_CANCELLED) {
          setIsLoading(false);
          return;
        }

        try {
          const signedInUser = await googleLogin(idToken);
          setIsLoading(false);
          if ((signedInUser as UserInfo).id) {
            setUser({
              isSignedIn: true,
              info: signedInUser as UserInfo,
              idToken,
            });
            Api.configure({token: idToken});
          }
        } catch (e) {
          Alert.alert(
            'Erreur',
            'Un problème avec votre connexion est survenue. Merci de réessayer ultérieurement.',
          );
        } finally {
          setIsLoading(false);
        }
      },
      signOut: async () => {
        setIsLoading(false);
        setUser({isSignedIn: false, info: undefined, idToken: undefined});
        Api.Token = undefined;
        await signOut();
      },
    };
  }, [user.idToken, user.info, user.isSignedIn, isLoading]);

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
