/**
 * @format
 */

import 'react-native';
import React from 'react';
import Home from '../../src/screens/Home';
// import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';

// More about testing in this repository:
// https://github.com/bamlab/react-native-testing/blob/master/src/pages/Home/__tests__/Home.test.tsx
describe('[Page] Home', () => {
  it('renders correctly', async () => {
    const root = render(<Home />);

    expect(root.toJSON()).toMatchSnapshot(); // Home page loaded with cards
  });
});
