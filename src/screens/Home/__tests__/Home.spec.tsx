/**
 * @format
 */

import 'react-native';
import React from 'react';
import Home from '../Home';
// import renderer from 'react-test-renderer';
import {render, waitForElementToBeRemoved} from '@testing-library/react-native';

jest.mock('../../../services/api/card', () => ({
  getCards: jest.fn().mockResolvedValue({
    data: [
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
    ],
  }),
}));

// More about testing in this repository:
// https://github.com/bamlab/react-native-testing/blob/master/src/pages/Home/__tests__/Home.test.tsx
describe('[Page] Home', () => {
  it('renders correctly', async () => {
    const root = render(<Home />);

    expect(root.toJSON()).toMatchSnapshot(); // Loading screen
    await waitForElementToBeRemoved(() => root.getByTestId('Loader'));
    expect(root.toJSON()).toMatchSnapshot(); // Home page loaded with cards
  });
});
