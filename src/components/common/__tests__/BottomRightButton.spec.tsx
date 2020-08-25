/**
 * @format
 */

import 'react-native';
import React from 'react';
import BottomRightButton from '../BottomRightButton';
import {render} from '@testing-library/react-native';

// More about testing in this repository:
// https://github.com/bamlab/react-native-testing/blob/master/src/pages/Home/__tests__/Home.test.tsx
describe('[Component] BottomRightButton', () => {
  it('renders correctly', async () => {
    const root = render(
      <BottomRightButton iconName="search1" onPress={() => {}} />,
    );

    expect(root.toJSON()).toMatchSnapshot();
  });
});
