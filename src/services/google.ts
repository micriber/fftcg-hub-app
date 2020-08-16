import {GoogleSignin} from '@react-native-community/google-signin';

export const signOut = async () => {
  await GoogleSignin.revokeAccess();
  await GoogleSignin.signOut();
};
