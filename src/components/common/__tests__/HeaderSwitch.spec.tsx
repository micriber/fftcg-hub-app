/**
 * @format
 */

import 'react-native';
import React from 'react';
import HeaderSwitch from '../HeaderSwitch';
import {render} from '@testing-library/react-native';

// More about testing in this repository:
// https://github.com/bamlab/react-native-testing/blob/master/src/pages/Home/__tests__/Home.test.tsx
describe('[Component] HeaderSwitch', () => {
  it('renders correctly with switch false', async () => {
    const root = render(
      <HeaderSwitch
        leftIconName="view-grid"
        rightIconName="format-list-bulleted"
      />,
    );

    expect(root.toJSON()).toMatchSnapshot();
  });
});
