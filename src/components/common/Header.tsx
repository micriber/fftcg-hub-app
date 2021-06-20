import React, {ReactNode} from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Appbar, useTheme} from 'react-native-paper';
import themes from './../../theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DrawerNavigationProp} from '@react-navigation/drawer/src/types';

type Props = {
  title?: string | ReactNode;
  left?: ReactNode;
  right?: ReactNode;
};

const Header = ({title, left, right}: Props) => {
  const theme = useTheme(themes.primary);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Appbar.Header
        theme={{colors: {primary: theme.colors.accent}}}
        style={styles.header}>
        {left}
        <Appbar.Content
          color={theme.colors.lightGrey}
          title={title}
          titleStyle={styles.title}
          style={styles.content}
        />
        {right}
      </Appbar.Header>
    </TouchableWithoutFeedback>
  );
};

type HeaderBackActionProps = {
  navigation: StackNavigationProp<ParamListBase>;
};

export const HeaderBackAction = ({navigation}: HeaderBackActionProps) => {
  const theme = useTheme(themes.primary);
  return (
    <Appbar.BackAction
      onPress={() => {
        Keyboard.dismiss();
        navigation.pop();
      }}
      color={theme.colors.lightGrey}
    />
  );
};

type HeaderDrawerActionProps = {
  navigation: DrawerNavigationProp<ParamListBase>;
};

export const HeaderDrawerAction = ({navigation}: HeaderDrawerActionProps) => {
  const theme = useTheme(themes.primary);
  return (
    <TouchableOpacity
      onPress={() => {
        Keyboard.dismiss();
        navigation.toggleDrawer();
      }}>
      <Icon
        name="menu"
        size={24}
        color={theme.colors.lightGrey}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 47,
  },
  content: {
    marginBottom: 3,
  },
  icon: {
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});

export default Header;
