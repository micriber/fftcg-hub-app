import React from 'react';
import CustomIcon from './CustomIcon';
import {ElementIconFile, GameActionIconFile} from '../../enums/element';

type Props = {
  size?: {width: number; height: number};
  inactiveColor?: 'gray';
  name: ElementIconFile | GameActionIconFile;
};

const GameIcon = ({inactiveColor, name, size}: Props) => {
  return <CustomIcon src={name} size={size} inactiveColor={inactiveColor} />;
};

export default GameIcon;
