import React from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {StyleSheet, Switch, View} from 'react-native';

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
      {leftIconName && <AntIcon name={leftIconName} size={20} />}
      <Switch value={value} onValueChange={onValueChange} />
      {rightIconName && <AntIcon name={rightIconName} size={22} />}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#878683', //LightTheme.colors.primary,
  },
});

export default HeaderSwitch;
