/**
 * @format
 */

import 'react-native';
import React from 'react';
import FFCardSimple from '../FFCardSimple';
import {render} from '@testing-library/react-native';

const card = {
  code: '1-001H',
  name: 'Boulou',
  text: 'billy',
  type: 'fire',
  element: 'blue',
  id: '1234-1234-1234-1234',
  rarity: 'H',
  cost: '1000',
  power: '',
  job: 'Soutien',
  category1: '',
  category2: '',
  multicard: '',
  exBurst: '',
};

// More about testing in this repository:
// https://github.com/bamlab/react-native-testing/blob/master/src/pages/Home/__tests__/Home.test.tsx
describe('[Component] BottomRightButton', () => {
  it('renders correctly in grid view', async () => {
    const root = render(<FFCardSimple card={card} isListView={false} />);

    expect(root.toJSON()).toMatchSnapshot();
  });

  it('renders correctly in list view', async () => {
    const root = render(<FFCardSimple card={card} isListView={true} />);

    expect(root.toJSON()).toMatchSnapshot();
  });
});
