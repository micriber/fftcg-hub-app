export enum ElementIconFile {
  'FIRE' = require('../assets/icons/fire.png'),
  'DARK' = require('../assets/icons/dark.png'),
  'EARTH' = require('../assets/icons/earth.png'),
  'ICE' = require('../assets/icons/ice.png'),
  'LIGHT' = require('../assets/icons/light.png'),
  'LIGHTNING' = require('../assets/icons/lightning.png'),
  'WATER' = require('../assets/icons/water.png'),
  'WIND' = require('../assets/icons/wind.png'),
}

export enum GameActionIconFile {
  'DOWN_ARROW' = require('../assets/icons/downarrow.png'),
  'SPECIAL' = require('../assets/icons/special.png'),
}

export function getElementIconFileByElement(element: string) {
  if (element === 'fire') {
    return ElementIconFile.FIRE;
  }
  if (element === 'dark') {
    return ElementIconFile.DARK;
  }
  if (element === 'earth') {
    return ElementIconFile.EARTH;
  }
  if (element === 'ice') {
    return ElementIconFile.ICE;
  }
  if (element === 'light') {
    return ElementIconFile.LIGHT;
  }
  if (element === 'lightning') {
    return ElementIconFile.LIGHTNING;
  }
  if (element === 'water') {
    return ElementIconFile.WATER;
  }
  if (element === 'wind') {
    return ElementIconFile.WIND;
  }
  return ElementIconFile.FIRE;
}
