import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Switch} from 'react-native-paper';
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
  return (
    <View style={styles.header}>
      {leftIconName && <Icon name={leftIconName} color="white" size={20} />}
      <Switch
        value={value}
        onValueChange={onValueChange}
        style={styles.switch}
        testID={`SwitcherState-${+value}`}
      />
      {rightIconName && <Icon name={rightIconName} color="white" size={22} />}
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
