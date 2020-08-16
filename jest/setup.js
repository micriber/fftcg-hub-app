import 'react-native-gesture-handler/jestSetup';
import {mockUserInfo} from './mocks/google-signin';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('@react-native-community/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(() => Promise.resolve(true)),
    signIn: jest.fn(() => Promise.resolve(mockUserInfo)),
    signInSilently: jest.fn(() => Promise.resolve(mockUserInfo)),
    revokeAccess: jest.fn(() => Promise.resolve(true)),
    signOut: jest.fn(() => Promise.resolve(true)),
  }
}));
