/**
 * @format
 */

import 'react-native';
import React from 'react';
import Card from '../Card';
import {render} from '@testing-library/react-native';
import {Text} from 'react-native';

// More about testing in this repository:
// https://github.com/bamlab/react-native-testing/blob/master/src/pages/Home/__tests__/Home.test.tsx
describe('[Component] Card', () => {
  it('renders correctly', async () => {
    const root = render(
      <Card>
        <Text>Children</Text>
      </Card>,
    );

    expect(root.toJSON()).toMatchSnapshot();
  });
});
