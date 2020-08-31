/**
 * @format
 */

import 'react-native';
import React from 'react';
import CustomIcon from '../CustomIcon';
import {render} from '@testing-library/react-native';

// More about testing in this repository:
// https://github.com/bamlab/react-native-testing/blob/master/src/pages/Home/__tests__/Home.test.tsx
describe('[Component] FFCardsList', () => {
  it('renders correctly', async () => {
    const root = render(
      <CustomIcon
        circle={false}
        src={require('../../../assets/icons/fire.png')}
      />,
    );

    expect(root.toJSON()).toMatchSnapshot();
  });

  it('renders correctly in circle', async () => {
    const root = render(
      <CustomIcon
        circle={true}
        src={require('../../../assets/icons/fire.png')}
      />,
    );

    expect(root.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with custom size', async () => {
    const root = render(
      <CustomIcon
        circle={false}
        size={{width: 40, height: 40}}
        src={require('../../../assets/icons/fire.png')}
      />,
    );

    expect(root.toJSON()).toMatchSnapshot();
  });

  it('renders correctly in circle with custom size', async () => {
    const root = render(
      <CustomIcon
        circle={true}
        size={{width: 40, height: 40}}
        src={require('../../../assets/icons/fire.png')}
      />,
    );

    expect(root.toJSON()).toMatchSnapshot();
  });
});
