/**
 * @format
 */

import 'react-native';
import React from 'react';
import Home from '../src/pages/Home';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', async () => {
  const navigation = {navigate: jest.fn()};
  // @ts-ignore
  renderer.create(<Home navigation={navigation} />);
});
