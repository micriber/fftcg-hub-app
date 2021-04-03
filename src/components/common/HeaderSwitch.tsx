import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar, Switch} from 'react-native-paper';

type Props = {
  leftIconName?: string;
  rightIconName?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

const HeaderSwitch = ({
  leftIconName,
  rightIconName,
  value,
  onValueChange,
}: Props) => {
  return (
    <Appbar style={styles.header}>
      {leftIconName && <Appbar.Action icon={leftIconName} size={20} />}
      <Switch
        value={value}
        onValueChange={onValueChange}
        testID={`SwitcherState-${+value}`}
      />
      {rightIconName && <Appbar.Action icon={rightIconName} size={22} />}
    </Appbar>
  );
};

const styles = StyleSheet.create({
  header: {
    // width: '100%',
    // alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'row',
    // paddingTop: 10,
    // paddingBottom: 10,
    // backgroundColor: '#878683', //LightTheme.colors.primary,
  },
});

export default HeaderSwitch;
