import React, {ReactElement} from 'react';

import {TouchableOpacity} from 'react-native';
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
    <Appbar.Header
      theme={{colors: {primary: theme.colors.accent}}}
      style={{height: 47}}>
      {previous ? (
        <Appbar.BackAction
          onPress={() => navigation.pop()}
          color={theme.colors.lightGrey}
        />
      ) : (
        <TouchableOpacity
          onPress={() => {
            (navigation as any).toggleDrawer();
          }}>
          <Icon
            name="menu"
            size={24}
            color={theme.colors.lightGrey}
            style={{marginHorizontal: 16}}
          />
        </TouchableOpacity>
      )}
      <Appbar.Content
        color={theme.colors.lightGrey}
        title={title}
        titleStyle={{fontSize: 20}}
        style={{marginBottom: 3}}
      />
      {headerRight}
    </Appbar.Header>
  );
};

export default Header;
