import React from 'react';
import {Text} from 'react-native';
import reactStringReplace from 'react-string-replace';
import {compose} from './fp';
import GameIcon from '../components/icons/GameIcon';
import {ElementIconFile, GameActionIconFile} from '../enums/element';
import {makeID} from './string';

const circleEnum: {[integer: number]: string} = {
  1: '\u2776',
  2: '\u2777',
  3: '\u2778',
  4: '\u2779',
  5: '\u277a',
  6: '\u277b',
  7: '\u277c',
  8: '\u277d',
  9: '\u277e',
};

const _replaceTextByIcon = (
  typeToMatch: string,
  iconReplacement: ElementIconFile | GameActionIconFile,
) => (text: string) => {
  return reactStringReplace(text, typeToMatch, () => (
    <GameIcon circle={true} name={iconReplacement} key={makeID()} />
  ));
};

const _styllishBBCode = (regex: RegExp, styles: Object) => (text: string) => {
  return reactStringReplace(
    text,
    regex,
    (match) =>
      match !== 'br' && (
        <Text key={makeID()} style={[styles]}>
          {match}
        </Text>
      ),
  );
};

const _styllishNumber = (regex: RegExp, styles: Object) => (text: string) => {
  return reactStringReplace(text, regex, (match) => {
    const matchNumber = parseInt(match, 10);
    const circleUnicode: string | null = circleEnum[matchNumber];
    return (
      <Text key={makeID()} style={[styles]}>
        {circleUnicode}
      </Text>
    );
  });
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
export const replaceDownArrowAction = _replaceTextByIcon(
  'ダル',
  GameActionIconFile.DOWN_ARROW,
);
export const replaceSpecialAction = _replaceTextByIcon(
  '《S》',
  GameActionIconFile.SPECIAL,
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

export const replaceTagEX = _styllishBBCode(/\[\[ex]](.*)\[\[\/]]/gm, {
  color: '#332a9d',
  fontStyle: 'italic',
  fontSize: 15,
  textShadowColor: 'rgba(0, 0, 0, 0.2)',
  textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 10,
});

export const replaceTagBR = _styllishBBCode(/\[\[(br)]]/gm, {});

export const styllishNumber = _styllishNumber(/《(1|2|3|4|5|6|9)》/gm, {
  height: 20,
  width: 20,
  fontSize: 18,
  borderRadius: 80,
  borderWidth: 100,
  borderColor: '#333',
});

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
    _replaceWrapper(replaceDownArrowAction),
    _replaceWrapper(replaceSpecialAction),
    _replaceWrapper(replaceTagEX),
    _replaceWrapper(replaceTagS),
    _replaceWrapper(replaceTagBR),
    _replaceWrapper(styllishNumber),
  )(text);

export default replaceTextByIconOrStyle;
