import React from 'react';
import CustomIcon from './CustomIcon';
import {ElementIconFile, GameActionIconFile} from '../../enums/element';

type Props = {
  size?: {width: number; height: number};
  name: ElementIconFile | GameActionIconFile;
  circle?: boolean;
};

const GameIcon = ({name, size, circle = false}: Props) => {
  return <CustomIcon circle={circle} src={name} size={size} />;
};

export default GameIcon;
