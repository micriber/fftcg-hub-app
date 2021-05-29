import React from 'react';
import {Alert} from 'react-native';
import {Api} from '../services/api';
import {googleLogin, UnauthorizedError, UserInfo} from '../services/api/user';
import {signOut} from '../services/google';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {AuthContext} from './AuthContext';

type UserState = {
  isSignedIn: boolean;
  info?: UserInfo;
  idToken?: string;
};

type Props = {
  children: React.ReactNode;
};

const AuthContextProvider = ({children}: Props) => {
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
          if (e.code === statusCodes.SIGN_IN_REQUIRED) {
            setIsLoading(false);
            return;
          }
        }

        const idToken = userInfo?.idToken;

        if (
          !idToken ||
          userInfo?.serverAuthCode === statusCodes.SIGN_IN_CANCELLED
        ) {
          setIsLoading(false);
          return;
        }

        try {
          const signedInUser = await googleLogin(idToken);
          if ((signedInUser as UnauthorizedError).message) {
            await signOut();
            Alert.alert(
              'Erreur',
              'Un problème de connexion est survenue. Merci de réessayer ultérieurement.',
            );
          }
          if ((signedInUser as UserInfo).id) {
            setUser({
              isSignedIn: true,
              info: signedInUser as UserInfo,
              idToken,
            });
            Api.configure({token: idToken});
          }
          setIsLoading(false);
        } catch (e) {
          await signOut();
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
  }, [user, isLoading]);

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
