import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './DrawerContent';
import {SearchStackScreen} from '../../../screens/Search';
import {HomeStackScreen} from '../../../screens/Home';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      initialRouteName="Home"
      drawerContentOptions={{activeTintColor: '#000000'}}>
      <Drawer.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          drawerLabel: 'Home',
          // headerTitle: 'Home',
          drawerIcon: () => <Icon name="home" size={26} />,
        }}
      />
      <Drawer.Screen
        name="Search"
        component={SearchStackScreen}
        options={{
          // header: Header,
          drawerLabel: 'Search',
          drawerIcon: () => <Icon name="magnify" size={26} />,
        }}
      />
      {/*<Drawer.Screen*/}
      {/*  name="Settings"*/}
      {/*  component={SettingsStackScreen}*/}
      {/*  options={{drawerLabel: 'Settings', drawerIcon: () => <></>}}*/}
      {/*/>*/}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
