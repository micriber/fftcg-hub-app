/**
 * @format
 */

import 'react-native';
import React from 'react';
import Home from '../Home';
import {HomeScreenNavigationProp} from '../Home';
import {
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
jest.mock('../../../services/api/card', () => ({
  getCards: jest.fn(),
}));
import {getCards} from '../../../services/api/card';

const data = [
  {
    code: '1-001H',
    name: 'Boulou',
    text: 'billy',
    type: 'fire',
    element: 'blue',
  },
  {
    code: '1-002R',
    name: 'Boulou',
    text: 'billy',
    type: 'fire',
    element: 'blue',
  },
  {
    code: '1-003C',
    name: 'Boulou',
    text: 'billy',
    type: 'fire',
    element: 'blue',
  },
];

let navigation = {
  // state: {params: {}},
  dispatch: jest.fn(),
  goBack: jest.fn(),
  // dismiss: jest.fn(),
  navigate: jest.fn(),
  // openDrawer: jest.fn(),
  // closeDrawer: jest.fn(),
  // toggleDrawer: jest.fn(),
  // getParam: jest.fn(),
  setOptions: jest.fn(),
  setParams: jest.fn(),
  addListener: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  isFocused: jest.fn(),
};

// More about testing in this repository:
// https://github.com/bamlab/react-native-testing/blob/master/src/pages/Home/__tests__/Home.test.tsx
describe('[Page] Home', () => {
  it('renders correctly', async () => {
    (getCards as jest.Mock).mockResolvedValue({data});
    const root = render(
      <Home navigation={(navigation as unknown) as HomeScreenNavigationProp} />,
    );

    expect(root.toJSON()).toMatchSnapshot(); // Loading screen
    await waitForElementToBeRemoved(() => root.getByTestId('Loader'));
    expect(root.toJSON()).toMatchSnapshot(); // Home page loaded with cards
  });

  it('should show error', async () => {
    (getCards as jest.Mock).mockRejectedValue({
      message: 'INTERNAL_SERVER_ERROR',
    });

    const root = render(
      <Home navigation={(navigation as unknown) as HomeScreenNavigationProp} />,
    );

    expect(root.toJSON()).toMatchSnapshot(); // Loading screen
    await waitForElementToBeRemoved(() => root.getByTestId('Loader'));
    expect(root.toJSON()).toMatchSnapshot(); // Home page loaded with cards
  });

  it('should show a backend error message', async () => {
    (getCards as jest.Mock).mockResolvedValue({
      message: '401 Unauthorized',
    });

    const root = render(
      <Home navigation={(navigation as unknown) as HomeScreenNavigationProp} />,
    );

    expect(root.toJSON()).toMatchSnapshot(); // Loading screen
    await waitForElementToBeRemoved(() => root.getByTestId('Loader'));
    expect(root.toJSON()).toMatchSnapshot(); // Home page loaded with cards
  });
});
