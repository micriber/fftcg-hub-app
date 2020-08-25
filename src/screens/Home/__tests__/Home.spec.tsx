/**
 * @format
 */

import 'react-native';
import React from 'react';
import Home from '../Home';
import {
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
import {Alert} from 'react-native';
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

// More about testing in this repository:
// https://github.com/bamlab/react-native-testing/blob/master/src/pages/Home/__tests__/Home.test.tsx
describe('[Page] Home', () => {
  it('renders correctly', async () => {
    (getCards as jest.Mock).mockResolvedValue({data});
    const root = render(<Home />);

    expect(root.toJSON()).toMatchSnapshot(); // Loading screen
    await waitForElementToBeRemoved(() => root.getByTestId('Loader'));
    expect(root.toJSON()).toMatchSnapshot(); // Home page loaded with cards
  });

  it('should show error', async () => {
    (getCards as jest.Mock).mockRejectedValue({
      message: 'INTERNAL_SERVER_ERROR',
    });

    const root = render(<Home />);

    expect(root.toJSON()).toMatchSnapshot(); // Loading screen
    await waitForElementToBeRemoved(() => root.getByTestId('Loader'));
    expect(root.toJSON()).toMatchSnapshot(); // Home page loaded with cards
  });

  it('should show a backend error message', async () => {
    (getCards as jest.Mock).mockResolvedValue({
      message: '401 Unauthorized',
    });

    const root = render(<Home />);

    expect(root.toJSON()).toMatchSnapshot(); // Loading screen
    await waitForElementToBeRemoved(() => root.getByTestId('Loader'));
    expect(root.toJSON()).toMatchSnapshot(); // Home page loaded with cards
  });

  it('should show an alert on press', async () => {
    (getCards as jest.Mock).mockResolvedValue({data});
    Alert.alert = jest.fn();

    const root = render(<Home />);

    // expect(root.toJSON()).toMatchSnapshot(); // Loading screen
    await waitForElementToBeRemoved(() => root.getByTestId('Loader'));
    fireEvent(root.getByTestId('BottomRightButton'), 'onPress');
    expect(Alert.alert).toHaveBeenCalledTimes(1);
    // expect(root.toJSON()).toMatchSnapshot(); // Home page loaded with cards
  });
});
