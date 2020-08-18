/**
 * @format
 */

import 'react-native';
import React from 'react';
import Home from '../../src/screens/Home';
// import renderer from 'react-test-renderer';
import {render, waitFor} from '@testing-library/react-native';
import {AuthContext} from '../../src/AuthContext';
import {User} from '@react-native-community/google-signin';

// More about testing in this repository:
// https://github.com/bamlab/react-native-testing/blob/master/src/pages/Home/__tests__/Home.test.tsx

it('renders correctly', async () => {
  const userInfo = {
    user: {
      id: '',
      name: 'Bobby',
      email: 'bobby.billy@gmail.com',
      photo: '',
      familyName: 'Billy',
      givenName: null,
    },
    idToken: null,
    serverAuthCode: null,
  };
  const root = render(
    <AuthContext.Provider
      value={{
        getCurrentUser: (): Promise<User | null> => Promise.resolve(userInfo),
        signIn: () => Promise.resolve(),
        signOut: () => Promise.resolve(),
      }}>
      <Home />
    </AuthContext.Provider>,
  );

  expect(root.toJSON()).toMatchSnapshot(); // Loading screen
  await waitFor(() => root.getByText('Welcome Bobby'));
  expect(root.toJSON()).toMatchSnapshot(); // Home page loaded with user
});
