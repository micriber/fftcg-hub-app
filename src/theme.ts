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
    primary: '#5286C5',
    accent: '#1D2F45',
    background: '#F2F2F2',
    active: '#3D6391',
    gris_clair: '#D1DEEE',
    gris_fonce: '#94AECE',
    surface: '#FFFFFF',
    text: '#1D2F45',
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
    primary: '#5286C5',
    accent: '#1D2F45',
    background: '#F2F2F2',
    active: '#3D6391',
    gris_clair: '#D1DEEE',
    gris_fonce: '#94AECE',
    surface: '#FFFFFF',
    text: '#1D2F45',
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

export default {
  primary,
  primaryDark,
};
