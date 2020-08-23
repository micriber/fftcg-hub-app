import React from 'react';
import {UserInfo} from './services/api/user';

export const AuthContext = React.createContext({
  getCurrentUser: (): UserInfo | null => null,
  getIdToken: (): string | null => null,
  signIn: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
});
