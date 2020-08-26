import React from 'react';
import {Image} from 'react-native';

type Props = {
  size?: {width: number; height: number};
  inactiveColor?: 'gray';
};

const FireIcon = ({inactiveColor, size}: Props) => {
  const stylesExtended = {
    ...(inactiveColor ? {tintColor: inactiveColor} : {}),
  };
  return (
    <Image
      style={[{width: 50, height: 50}, size, stylesExtended]}
      source={require('../../../assets/icons/fire.png')}
    />
  );
};

export default FireIcon;
