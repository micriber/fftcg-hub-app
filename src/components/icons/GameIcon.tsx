import React from 'react';
import CustomIcon from './CustomIcon';
import {ElementIconFile, GameActionIconFile} from '../../enums/element';

type Props = {
  size?: {width: number; height: number};
  inactiveColor?: 'gray';
  name: ElementIconFile | GameActionIconFile;
  circle?: boolean;
};

const GameIcon = ({inactiveColor, name, size, circle = false}: Props) => {
  return (
    <CustomIcon
      circle={circle}
      src={name}
      size={size}
      inactiveColor={inactiveColor}
    />
  );
};

export default GameIcon;
