export {};

import React from 'react';
import {SvgProps} from 'react-native-svg';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      active: string;
      lightGrey: string;
      darkGrey: string;
    }
  }
}

declare module '*.svg' {
  const content: React.FC<SvgProps>;
  export default content;
}
