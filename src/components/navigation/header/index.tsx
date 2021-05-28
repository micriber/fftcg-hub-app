import React, {ReactElement} from 'react';

import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Appbar, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StackHeaderProps} from '@react-navigation/stack';

type Props = StackHeaderProps & {
  headerRight?: ReactElement;
};

type DrawerActions = {
  openDrawer: () => any;
  closeDrawer: () => any;
  toggleDrawer: () => any;
  pop: () => any;
};

type CustomNavigation = Pick<Props, 'navigation'> & DrawerActions;

const styles = StyleSheet.create({
  header: {
    height: 47,
  },
  icon: {
    marginHorizontal: 16,
  },
  content: {
    marginBottom: 3,
  },
  title: {
    fontSize: 20,
  },
});

const Header = (props: Props) => {
  const {scene, previous, headerRight} = props;
  const navigation = (props.navigation as unknown) as CustomNavigation;
  const {options} = scene.descriptor;
  const theme = useTheme();
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Appbar.Header
        theme={{colors: {primary: theme.colors.accent}}}
        style={styles.header}>
        {previous ? (
          <Appbar.BackAction
            onPress={() => {
              Keyboard.dismiss();
              navigation.pop();
            }}
            color={theme.colors.lightGrey}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              (navigation as any).toggleDrawer();
            }}>
            <Icon
              name="menu"
              size={24}
              color={theme.colors.lightGrey}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
        <Appbar.Content
          color={theme.colors.lightGrey}
          title={title}
          titleStyle={styles.title}
          style={styles.content}
        />
        {headerRight}
      </Appbar.Header>
    </TouchableWithoutFeedback>
  );
};

export default Header;
