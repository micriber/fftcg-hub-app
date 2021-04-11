import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Switch, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
  const theme = useTheme();
  return (
    <View style={styles.header}>
      {leftIconName && <Icon name={leftIconName} color="black" size={20} />}
      <Switch
        value={value}
        onValueChange={onValueChange}
        style={styles.switch}
        testID={`SwitcherState-${+value}`}
        color={theme.colors.active}
      />
      {rightIconName && <Icon name={rightIconName} color="black" size={22} />}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 5,
  },
  switch: {
    marginLeft: 2,
  },
});

export default HeaderSwitch;
