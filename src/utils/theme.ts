import {DarkTheme as RNDarkTheme, DefaultTheme} from '@react-navigation/native';

export const DarkTheme = {
  ...RNDarkTheme,
  colors: {
    ...RNDarkTheme.colors,
    text: '#bebebe',
    // primary: 'rgb(63, 197, 107)',
  },
};

export const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#bebebe',
  },
};
