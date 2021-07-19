import React from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {Switch, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ColorTranslator} from 'colortranslator';
import themes from './../../theme';
import {HeaderBarContext} from '../../contexts/HeaderBarContext';
import analytics from '@react-native-firebase/analytics';

type Props = {
  leftIconName?: string;
  rightIconName?: string;
};

const HeaderSwitch = ({leftIconName, rightIconName}: Props) => {
  const theme = useTheme(themes.primary);
  const {setSwitchValue, switchValue} = React.useContext(HeaderBarContext);

  return (
    <View style={styles.header}>
      {leftIconName && (
        <Icon name={leftIconName} color={theme.colors.lightGrey} size={20} />
      )}
      <Switch
        value={switchValue}
        onValueChange={async (withValue: boolean) => {
          await analytics().logEvent('switch_view', {
            value: withValue ? 'simple' : 'detail',
          });
          Keyboard.dismiss();
          setSwitchValue(withValue);
        }}
        style={styles.switch}
        testID={`SwitcherState-${+switchValue}`}
        thumbColor={switchValue ? theme.colors.active : '#ffffff'}
        trackColor={{
          false: new ColorTranslator(theme.colors.darkGrey).setA(0.3).RGBA,
          true: new ColorTranslator(theme.colors.active).setA(0.5).RGBA,
        }}
      />
      {rightIconName && (
        <Icon name={rightIconName} color={theme.colors.lightGrey} size={22} />
      )}
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
