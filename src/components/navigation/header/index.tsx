import React from 'react';
import {Animated} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Header, {
  HeaderBackAction,
  HeaderDrawerAction,
} from '../../common/Header';
import {ParamListBase, Route} from '@react-navigation/native';
import {Scene, StackHeaderOptions} from '@react-navigation/stack/src/types';
import {DrawerNavigationProp} from '@react-navigation/drawer/src/types';

type HeaderStackNavigationProps = {
  scene: Scene<Route<string>>;
  navigation: StackNavigationProp<ParamListBase>;
};

export const HeaderStackNavigation = ({
  scene,
  navigation,
}: HeaderStackNavigationProps) => {
  const {options} = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Header
      title={title}
      left={<HeaderBackAction navigation={navigation} />}
      right={headerRight(options)}
    />
  );
};

type HeaderDrawerNavigationProps = {
  scene: Scene<Route<string>>;
  navigation: DrawerNavigationProp<ParamListBase>;
};

export const HeaderDrawerNavigation = ({
  scene,
  navigation,
}: HeaderDrawerNavigationProps) => {
  const {options} = scene?.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Header
      title={title}
      left={<HeaderDrawerAction navigation={navigation} />}
      right={headerRight(options)}
    />
  );
};

const headerRight = (options: StackHeaderOptions) => (
  <Animated.View
    style={[
      options.headerRightContainerStyle && options.headerRightContainerStyle,
    ]}>
    {options.headerRight && options.headerRight({})}
  </Animated.View>
);
