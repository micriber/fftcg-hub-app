import React from 'react';
import {StyleSheet, Text} from 'react-native';
import reactStringReplace from 'react-string-replace';
import {compose} from './fp';
import GameIcon from '../components/icons/GameIcon';
import {ElementIconFile, GameActionIconFile} from '../enums/element';
import {makeID} from './string';

const circleEnum: {[number: string]: string} = {
  '0': '\u2775',
  '1': '\u2776',
  '１': '\u2776',
  '2': '\u2777',
  '3': '\u2778',
  '4': '\u2779',
  '5': '\u277a',
  '6': '\u277b',
  '7': '\u277c',
  '8': '\u277d',
  '9': '\u277e',
};

const styles = StyleSheet.create({
  bravoure: {fontWeight: 'bold'},
});

const _replaceTextByIcon = (
  typeToMatch: string | RegExp,
  iconReplacement: ElementIconFile | GameActionIconFile,
) => (text: string) => {
  return reactStringReplace(text, typeToMatch, () => (
    <GameIcon name={iconReplacement} key={makeID()} />
  ));
};

const _styllishBBCode = (regex: RegExp, style: Object) => (text: string) => {
  return reactStringReplace(text, regex, (match) => {
    if (match === 'br') {
      return ' ';
    } else if (match.includes('.[[br]]')) {
      return '.\n';
    } else if (match.includes('"[[br]]')) {
      return '"\n';
    } else if (match === 'Bravoure[[br]] ') {
      return (
        <Text key={makeID()} style={styles.bravoure}>
          Bravoure{'\n'}
        </Text>
      );
    } else if (match === '&middot;') {
      return '.';
    } else {
      return (
        <Text key={makeID()} style={[style]}>
          {reactStringReplace(match, '[[br]]   ', () => ' ')}
        </Text>
      );
    }
  });
};

const _styllishNumber = (regex: RegExp, style: Object) => (text: string) => {
  return reactStringReplace(text, regex, (match) => {
    const circleUnicode: string | null = circleEnum[match];
    return (
      <Text key={makeID()} style={[style]}>
        {circleUnicode}
      </Text>
    );
  });
};

const _replaceWrapper = (fn: Function) => (text: string) => fn(text);

export const replaceFireType = _replaceTextByIcon(
  /(《火》|火)/gm,
  ElementIconFile.FIRE,
);
export const replaceIceType = _replaceTextByIcon(
  /(《氷》|氷)/gm,
  ElementIconFile.ICE,
);
export const replaceWindType = _replaceTextByIcon(
  /(《風》|風)/gm,
  ElementIconFile.WIND,
);
export const replaceEarthType = _replaceTextByIcon(
  /(《土》|土)/gm,
  ElementIconFile.EARTH,
);
export const replaceLightningType = _replaceTextByIcon(
  /(《雷》|雷)/gm,
  ElementIconFile.LIGHTNING,
);
export const replaceWaterType = _replaceTextByIcon(
  /(《水》|水)/gm,
  ElementIconFile.WATER,
);
export const replaceLightType = _replaceTextByIcon(
  /(《光》|光)/gm,
  ElementIconFile.LIGHT,
);
export const replaceDarkType = _replaceTextByIcon(
  /(《闇》|闇)/gm,
  ElementIconFile.DARK,
);
export const replaceDownArrowAction = _replaceTextByIcon(
  /(《ダル》|ダル)/gm,
  GameActionIconFile.DOWN_ARROW,
);
export const replaceSpecialAction = _replaceTextByIcon(
  '《S》',
  GameActionIconFile.SPECIAL,
);

export const replaceTagS = _styllishBBCode(/\[\[[s]]]([^/]+)\[\[\/]]/gm, {
  color: '#f80',
  fontStyle: 'italic',
  textShadowColor: 'rgba(0, 0, 0, 0.2)',
  textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 10,
});

export const replaceTagEX = _styllishBBCode(/\[\[ex]]([^/]+)\[\[\/]]/gm, {
  color: '#332a9d',
  fontStyle: 'italic',
  fontSize: 15,
  textShadowColor: 'rgba(0, 0, 0, 0.2)',
  textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 10,
});

export const replaceTagI = _styllishBBCode(/\[\[i]]([^/]+)\[\[\/]]/gm, {
  fontStyle: 'italic',
});

export const replaceTagPBR = _styllishBBCode(
  /(\.\[\[br]] {0,3}|"\[\[br]] {0,3}|Bravoure\[\[br]] )/gm,
  {},
);
export const replaceTagBR = _styllishBBCode(/\[\[(br)]] {0,10}/gm, {});

export const replaceDot = _styllishBBCode(/(&middot;)/gm, {});

export const replaceNumber = _styllishNumber(/《([123456789１])》/gm, {});

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
    _replaceWrapper(replaceDot),
    _replaceWrapper(replaceTagBR),
    _replaceWrapper(replaceTagPBR),
    _replaceWrapper(replaceNumber),
    _replaceWrapper(replaceTagI),
  )(text);

export default replaceTextByIconOrStyle;
