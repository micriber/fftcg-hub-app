/**
 * @format
 */

import 'react-native';
import React from 'react';
import Divider from '../Divider';
import {render} from '@testing-library/react-native';

// More about testing in this repository:
// https://github.com/bamlab/react-native-testing/blob/master/src/pages/Home/__tests__/Home.test.tsx
describe('[Component] Divider', () => {
  it('renders correctly', async () => {
    const root = render(<Divider />);

    expect(root.toJSON()).toMatchSnapshot();
  });
});
