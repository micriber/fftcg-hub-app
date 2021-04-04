import * as React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
// import {AboutStackScreen} from '../About';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SearchStackScreen} from '../Search';
import {HomeStackScreen} from '../Home';
import {SettingsStackScreen} from '../Settings';
import {Theme} from 'react-native-paper/lib/typescript/types';

interface ITabBarIcon {
  color: string;
  size: number;
}

const Tabs = createMaterialBottomTabNavigator();

type Props = {
  theme: Theme;
};

const barStyle = {backgroundColor: '#694fad'};

const BottomTabsNavigator = ({}: Props) => (
  <Tabs.Navigator initialRouteName="Home" shifting={true} barStyle={barStyle}>
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
        tabBarColor: 'rgba(255, 0, 0, 0.5)',
        tabBarIcon: ({color}: ITabBarIcon) => (
          <Icon name="magnify" color={color} size={26} />
        ),
      }}
    />
    <Tabs.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Collection',
        tabBarColor: 'rgba(0, 255, 0, 0.5)',
        tabBarIcon: ({color}: ITabBarIcon) => (
          <Icon name="home" color={color} size={26} />
        ),
      }}
    />
    <Tabs.Screen
      name="Settings"
      component={SettingsStackScreen}
      options={{
        tabBarLabel: 'Settings',
        tabBarColor: 'rgba(0, 0, 255, 0.5)',
        tabBarIcon: ({color}: ITabBarIcon) => (
          <Icon name="cog" color={color} size={26} />
        ),
      }}
    />
  </Tabs.Navigator>
);

export {BottomTabsNavigator};
