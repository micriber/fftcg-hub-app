import React from 'react';

export type defaultValue = {
  switchValue: boolean;
  setSwitchValue: (switchValue: boolean) => void;
};

const defaultValue: defaultValue = {
  switchValue: false,
  setSwitchValue: () => {},
};

export const HeaderBarContext = React.createContext(defaultValue);
