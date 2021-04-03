import {configureFonts} from 'react-native-paper';
import {Fonts} from 'react-native-paper/lib/typescript/types';

const fontConfig: {ios: Fonts; android: Fonts} = {
  ios: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
};

const primary = {
  dark: false,
  roundness: 4,
  colors: {
    primary: '#034748',
    accent: '#11B5E4',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#001021',
    error: '#B71F0E',
    disabled: '#BEC6C6',
    placeholder: '#1481BA',
    backdrop: '#001021',
    onSurface: '#000000',
    onBackground: '#000000',
    notification: '#f50057',
  },
  fonts: configureFonts(fontConfig),
  animation: {scale: 1.0},
};

const primaryDark = {
  dark: true,
  roundness: 4,
  colors: {
    primary: '#1481BA',
    accent: '#11B5E4',
    background: '#343434',
    surface: '#3a3a3a',
    text: '#FFFFFF',
    error: '#B71F0E',
    disabled: '#FFFFFF',
    placeholder: '#034748',
    backdrop: '#343434',
    onSurface: '#FFFFFF',
    onBackground: '#FFFFFF',
    notification: '#ff80ab',
  },
  fonts: configureFonts(fontConfig),
  animation: {scale: 1.0},
};

export default {
  primary,
  primaryDark,
};
