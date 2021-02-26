import * as React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
// import {AboutStackScreen} from '../About';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {SearchStackScreen} from '../Search';
import {HomeStackScreen} from '../Home';
import {SettingsStackScreen} from '../Settings';
import {Theme} from '@react-navigation/native';

interface ITabBarIcon {
  color: string;
  size: number;
}

const Tabs = createMaterialBottomTabNavigator();

type Props = {
  theme: Theme;
};

const BottomTabsNavigator = ({theme}: Props) => (
  <Tabs.Navigator
    initialRouteName="Home"
    shifting={true}
    barStyle={{backgroundColor: '#694fad'}}>
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
          <AntIcon name="search1" color={color} size={26} />
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
          <AntIcon name="home" color={color} size={26} />
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
          <AntIcon name="setting" color={color} size={26} />
        ),
      }}
    />
  </Tabs.Navigator>
);

export {BottomTabsNavigator};
