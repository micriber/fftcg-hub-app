import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AboutStackScreen} from '../About';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {SearchStackScreen} from '../Search';
import {HomeStackScreen} from '../Home';
import {SettingsStackScreen} from '../Settings';
import {Theme} from '@react-navigation/native';

interface ITabBarIcon {
  color: string;
  size: number;
}

const Tabs = createBottomTabNavigator();

type Props = {
  theme: Theme;
};

const BottomTabsNavigator = ({theme}: Props) => (
  <Tabs.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: theme.colors.primary,
    }}>
    {/*<Tabs.Screen*/}
    {/*  name="About"*/}
    {/*  component={AboutStackScreen}*/}
    {/*  options={{*/}
    {/*    tabBarLabel: 'About',*/}
    {/*    tabBarIcon: ({color, size}: ITabBarIcon) => (*/}
    {/*      <AntIcon name="camera" color={color} size={size} />*/}
    {/*    ),*/}
    {/*  }}*/}
    {/*/>*/}
    <Tabs.Screen
      name="Search"
      component={SearchStackScreen}
      options={{
        tabBarLabel: 'Search',
        tabBarIcon: ({color, size}: ITabBarIcon) => (
          <AntIcon name="search1" color={color} size={size} />
        ),
      }}
    />
    <Tabs.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Collection',
        tabBarIcon: ({color, size}: ITabBarIcon) => (
          <AntIcon name="home" color={color} size={size} />
        ),
      }}
    />
    <Tabs.Screen
      name="Settings"
      component={SettingsStackScreen}
      options={{
        tabBarLabel: 'Settings',
        tabBarIcon: ({color, size}: ITabBarIcon) => (
          <AntIcon name="setting" color={color} size={size} />
        ),
      }}
    />
  </Tabs.Navigator>
);

export {BottomTabsNavigator};
