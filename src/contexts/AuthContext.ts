import React from 'react';
import {UserInfo} from '../services/api/user';

type UserState = {
  isSignedIn: boolean;
  info?: UserInfo;
  idToken?: string;
};

const user: UserState = {isSignedIn: false};
export const AuthContext = React.createContext({
  user,
  isLoading: false,
  getCurrentUser: (): UserInfo | null => null,
  getIdToken: (): string | null => null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signIn: (silently = false) => Promise.resolve(),
  signOut: () => Promise.resolve(),
});
