/**
 * @format
 */

import 'react-native';
import React from 'react';
import FFCardSimple from '../FFCardSimple';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {getCardImageUrl} from '../../utils/image';

const card = {
  code: '1-001H',
  name: 'Boulou',
  text: 'billy 《火》《1》《ダル》',
  type: 'blue',
  element: '火',
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
describe('[Component] FFCardSimple', () => {
  it('renders correctly in grid view', async () => {
    const root = render(<FFCardSimple card={card} isListView={false} />);

    expect(root.toJSON()).toMatchSnapshot();
  });

  it('renders correctly in list view', async () => {
    const root = render(<FFCardSimple card={card} isListView={true} />);

    expect(root.toJSON()).toMatchSnapshot();
  });

  it('renders correctly but with fallback image', async () => {
    const Sample = () => <FFCardSimple card={card} isListView={false} />;
    const root = render(<Sample />);
    fireEvent(root.getByTestId(`Image-${card.code}`), 'onError');
    root.update(<Sample />);
    await waitFor(() => root.getByTestId(`Image-${card.code}`));
    const element = root.getByTestId(`Image-${card.code}`);
    console.log(element.props.source.uri);
    expect(element.props.source.uri).toBe(
      getCardImageUrl(card.code, 'full', 'eg'),
    );

    expect(root.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with twice callback', async () => {
    const Sample = () => <FFCardSimple card={card} isListView={false} />;
    const root = render(<Sample />);
    fireEvent(root.getByTestId(`Image-${card.code}`), 'onError');
    root.update(<Sample />);
    await waitFor(() => root.getByTestId(`Image-${card.code}`));
    fireEvent(root.getByTestId(`Image-${card.code}`), 'onError');
    root.update(<Sample />);
    await waitFor(() => root.getByTestId(`Image-${card.code}`));
    const element = root.getByTestId(`Image-${card.code}`);
    console.log(element.props.source.uri);
    expect(element.props.source.uri).toBe(
      getCardImageUrl(card.code, 'full', 'eg'),
    );

    expect(root.toJSON()).toMatchSnapshot();
  });
});
