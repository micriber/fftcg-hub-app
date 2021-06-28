import React from 'react';
import {HeaderBarContext} from './HeaderBarContext';

type Props = {
  children: React.ReactNode;
};

const HeaderBarContextProvider = ({children}: Props) => {
  const [switchValue, setSwitchValue] = React.useState(false);
  return (
    <HeaderBarContext.Provider
      value={{
        switchValue,
        setSwitchValue,
      }}>
      {children}
    </HeaderBarContext.Provider>
  );
};

export default HeaderBarContextProvider;
