/**
 * @format
 */

import 'react-native';
import React from 'react';
import * as Icon from '../icon';
import replaceTextByIconOrStyle from '../icon';
import {render} from '@testing-library/react-native';

// More about testing in this repository:
// https://github.com/bamlab/react-native-testing/blob/master/src/pages/Home/__tests__/Home.test.tsx
describe('[Util] icon', () => {
  describe('[FIRE] type', () => {
    it('replace fire mark', async () => {
      const sample = Icon.replaceFireType('火');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });

    it('deeply replace fire mark', async () => {
      const sample = Icon.replaceFireType('火 - 火');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });

    it('replace nothing', async () => {
      const sample = Icon.replaceFireType('《1》《ダル》');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });
  });

  describe('[ICE] type', () => {
    it('replace ice mark', async () => {
      const sample = Icon.replaceIceType('氷');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });

    it('deeply replace ice mark', async () => {
      const sample = Icon.replaceIceType('氷 - 氷');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });

    it('replace nothing', async () => {
      const sample = Icon.replaceIceType('《1》《ダル》');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });
  });

  describe('[WIND] type', () => {
    it('replace wind mark', async () => {
      const sample = Icon.replaceWindType('風');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });

    it('deeply replace wind mark', async () => {
      const sample = Icon.replaceWindType('風 - 風');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });

    it('replace nothing', async () => {
      const sample = Icon.replaceWindType('《1》《ダル》');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });
  });

  describe('[EARTH] type', () => {
    it('replace earth mark', async () => {
      const sample = Icon.replaceEarthType('土');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });

    it('deeply replace earth mark', async () => {
      const sample = Icon.replaceEarthType('土 - 土');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });

    it('replace nothing', async () => {
      const sample = Icon.replaceEarthType('《1》《ダル》');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });
  });

  describe('[LIGHTNING] type', () => {
    it('replace earth mark', async () => {
      const sample = Icon.replaceLightningType('雷');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });

    it('deeply replace lightning mark', async () => {
      const sample = Icon.replaceLightningType('雷 - 雷');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });

    it('replace nothing', async () => {
      const sample = Icon.replaceLightningType('《1》《ダル》');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });
  });

  describe('[WATER] type', () => {
    it('replace water mark', async () => {
      const sample = Icon.replaceWaterType('水');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });

    it('deeply replace water mark', async () => {
      const sample = Icon.replaceWaterType('水 - 水');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });

    it('replace nothing', async () => {
      const sample = Icon.replaceWaterType('《1》《ダル》');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });
  });

  describe('[LIGHT] type', () => {
    it('replace light mark', async () => {
      const sample = Icon.replaceLightType('光');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });

    it('deeply replace light mark', async () => {
      const sample = Icon.replaceLightType('光 - 光');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });

    it('replace nothing', async () => {
      const sample = Icon.replaceLightType('《1》《ダル》');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });
  });

  describe('[DARK] type', () => {
    it('replace dark mark', async () => {
      const sample = Icon.replaceDarkType('闇');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });

    it('deeply replace dark mark', async () => {
      const sample = Icon.replaceDarkType('闇 - 闇');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });

    it('replace nothing', async () => {
      const sample = Icon.replaceDarkType('《1》《ダル》');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });
  });

  describe('[DOWN_ARROW] action', () => {
    it('replace down arrow mark', async () => {
      const sample = Icon.replaceDownArrowAction('ダル');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });

    it('deeply replace down arrow mark', async () => {
      const sample = Icon.replaceDownArrowAction('ダル - ダル');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });

    it('replace nothing', async () => {
      const sample = Icon.replaceDownArrowAction('《1》《闇》');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });
  });

  describe('[SPECIAL] action', () => {
    it('replace special mark', async () => {
      const sample = Icon.replaceSpecialAction('《S》');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });

    it('deeply replace special mark', async () => {
      const sample = Icon.replaceSpecialAction('《S》 - 《S》');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });

    it('replace nothing', async () => {
      const sample = Icon.replaceSpecialAction('《1》《闇》');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });
  });

  describe('[S] tag', () => {
    it('replace S mark', async () => {
      const sample = Icon.replaceTagS('[[s]] boulou [[/]]');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });

    it('deeply replace S mark', async () => {
      const sample = Icon.replaceTagS('[[s]]Boulou le[[/]] - [[s]]Billy[[/]]');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });

    it('replace nothing', async () => {
      const sample = Icon.replaceTagS('《1》《闇》');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });
  });

  describe('[EX] tag', () => {
    it('replace EX mark', async () => {
      const sample = Icon.replaceTagEX('[[ex]]EX BURST[[/]]');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });

    it('deeply replace EX mark', async () => {
      const sample = Icon.replaceTagEX(
        '[[ex]]EX BURST 1[[/]] - [[ex]]EX BURST 2[[/]]',
      );
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });

    it('replace nothing', async () => {
      const sample = Icon.replaceTagEX('《1》《闇》');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });
  });

  describe('[BR] tag', () => {
    it('replace BR mark', async () => {
      const sample = Icon.replaceTagBR('[[ex]]EX BURST[[/]] [[br]]');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });

    it('deeply replace BR mark', async () => {
      const sample = Icon.replaceTagBR(
        '[[ex]]EX BURST 1[[/]] [[br]] - [[s]]EX BURST 2[[/]] [[br]]',
      );
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });

    it('replace nothing', async () => {
      const sample = Icon.replaceTagBR('《1》《闇》 br');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });
  });

  describe('[Number] tag', () => {
    it('replace number mark', async () => {
      const sample = Icon.replaceNumber(
        '《1》 《2》 《3》 《4》 《5》 《6》 《7》 《8》 《9》',
      );
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });

    it('replace nothing', async () => {
      const sample = Icon.replaceNumber('《闇》 br');
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });
  });

  describe('[GLOBAL] all tag', () => {
    it('replace all mark', async () => {
      const sample = replaceTextByIconOrStyle(
        '《1》 《2》 《3》 《4》 《5》 《6》 《7》 《8》 《9》 火 氷 風 土 雷 水 光 闇 ダル 《S》 [[s]]boulou[[/]] [[ex]]EX BURST[[/]] [[br]]',
      );
      const root = render(<>{sample}</>);
      expect(root.toJSON()).toMatchSnapshot();
    });
  });
});
