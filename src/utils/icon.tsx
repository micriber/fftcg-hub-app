import React from 'react';
import {Text} from 'react-native';
import reactStringReplace from 'react-string-replace';
import {compose} from './fp';
import GameIcon from '../components/icons/GameIcon';
import {ElementIconFile, GameActionIconFile} from '../enums/element';
import {makeID} from './string';

const _replaceTextByIcon = (
  typeToMatch: string,
  iconReplacement: ElementIconFile | GameActionIconFile,
) => (text: string) => {
  return reactStringReplace(text, typeToMatch, () => (
    <GameIcon name={iconReplacement} key={makeID()} />
  ));
};

const _styllishBBCode = (regex: RegExp, styles: Object) => (text: string) => {
  return reactStringReplace(text, regex, (match) => (
    <Text key={makeID()} style={[styles]}>
      {match}
    </Text>
  ));
};

const _replaceWrapper = (fn: Function) => (text: string) => fn(text);

export const replaceFireType = _replaceTextByIcon('火', ElementIconFile.FIRE);
export const replaceIceType = _replaceTextByIcon('氷', ElementIconFile.ICE);
export const replaceWindType = _replaceTextByIcon('風', ElementIconFile.WIND);
export const replaceEarthType = _replaceTextByIcon('土', ElementIconFile.EARTH);
export const replaceLightningType = _replaceTextByIcon(
  '雷',
  ElementIconFile.LIGHTNING,
);
export const replaceWaterType = _replaceTextByIcon('水', ElementIconFile.WATER);
export const replaceLightType = _replaceTextByIcon('光', ElementIconFile.LIGHT);
export const replaceDarkType = _replaceTextByIcon('闇', ElementIconFile.DARK);
export const replaceDownArrowType = _replaceTextByIcon(
  'ダル',
  GameActionIconFile.DOWN_ARROW,
);

export const replaceTagS = _styllishBBCode(
  /\[\[[a-zA-Z0-9!$* \t\r\n-]]](.*)\[\[\/]]/gm,
  {
    color: '#f80',
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
);

const replaceTextByIconOrStyle = (text: string) =>
  compose(
    _replaceWrapper(replaceFireType),
    _replaceWrapper(replaceIceType),
    _replaceWrapper(replaceWindType),
    _replaceWrapper(replaceEarthType),
    _replaceWrapper(replaceLightningType),
    _replaceWrapper(replaceWaterType),
    _replaceWrapper(replaceLightType),
    _replaceWrapper(replaceDarkType),
    _replaceWrapper(replaceDownArrowType),
    _replaceWrapper(replaceTagS),
  )(text);

export default replaceTextByIconOrStyle;
