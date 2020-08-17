import React from 'react';
import {User} from '@react-native-community/google-signin';

export const AuthContext = React.createContext({
  getCurrentUser: (): Promise<User | null> => Promise.resolve(null),
  signIn: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
});
