import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './DrawerContent';
import {SearchStackScreen} from '../../../screens/Search';
import {HomeStackScreen} from '../../../screens/Home';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Drawer = createDrawerNavigator();

type Props = {
  signOut: () => {};
};

const DrawerNavigator = ({signOut}: Props) => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} signOut={signOut} />}
      initialRouteName="Home"
      drawerContentOptions={{activeTintColor: '#000000'}}>
      <Drawer.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          drawerLabel: 'Home',
          drawerIcon: () => <Icon name="home" size={26} />,
        }}
      />
      <Drawer.Screen
        name="Search"
        component={SearchStackScreen}
        options={{
          drawerLabel: 'Search',
          drawerIcon: () => <Icon name="magnify" size={26} />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
