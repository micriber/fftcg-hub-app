/**
 * @format
 */

import 'react-native';
import React from 'react';
import HeaderSwitch from '../HeaderSwitch';
import {fireEvent, render, waitFor} from '@testing-library/react-native';

// More about testing in this repository:
// https://github.com/bamlab/react-native-testing/blob/master/src/pages/Home/__tests__/Home.test.tsx
describe('[Component] HeaderSwitch', () => {
  it('renders correctly with switch false', async () => {
    const root = render(
      <HeaderSwitch
        leftIconName="appstore-o"
        rightIconName="bars"
        value={false}
        onValueChange={() => {}}
      />,
    );

    expect(root.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with switch right', () => {
    const root = render(
      <HeaderSwitch
        leftIconName="appstore-o"
        rightIconName="bars"
        value={true}
        onValueChange={() => {}}
      />,
    );

    expect(root.toJSON()).toMatchSnapshot();
  });

  it('Switch value change', async () => {
    let value = false;
    const onValueChange = jest.fn((val) => (value = val));
    const Sample = () => (
      <HeaderSwitch
        leftIconName="appstore-o"
        rightIconName="bars"
        value={value}
        onValueChange={onValueChange}
      />
    );
    const root = render(<Sample />);

    expect(root.toJSON()).toMatchSnapshot();
    fireEvent(root.getByTestId('SwitcherState-0'), 'onValueChange', true);
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(value).toBeTruthy();
    root.update(<Sample />);
    await waitFor(() => root.getByTestId('SwitcherState-1'));
    expect(root.toJSON()).toMatchSnapshot();
  });
});
