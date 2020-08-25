/**
 * @format
 */

import 'react-native';
import React from 'react';
import FFCardsList from '../FFCardsList';
import {render} from '@testing-library/react-native';
import {Text} from 'react-native';

const cards = [
  {
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
  },
  {
    code: '1-002H',
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
  },
];

// More about testing in this repository:
// https://github.com/bamlab/react-native-testing/blob/master/src/pages/Home/__tests__/Home.test.tsx
describe('[Component] FFCardsList', () => {
  it('renders correctly in grid view', async () => {
    const root = render(<FFCardsList isListView={false} cards={cards} />);

    expect(root.toJSON()).toMatchSnapshot();
  });

  it('renders correctly in list view', async () => {
    const root = render(<FFCardsList isListView={true} cards={cards} />);

    expect(root.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with children', async () => {
    const root = render(
      <FFCardsList isListView={true} cards={cards}>
        <Text>End of list</Text>
      </FFCardsList>,
    );

    expect(root.toJSON()).toMatchSnapshot();
  });
});
