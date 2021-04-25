import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './DrawerContent';
import {SearchStackScreen} from '../../../screens/Search';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'react-native-paper';

const Drawer = createDrawerNavigator();

type Props = {
  signOut: () => {};
};

const DrawerNavigator = ({signOut}: Props) => {
  const theme = useTheme();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} signOut={signOut} />}
      initialRouteName="Search"
      drawerContentOptions={{
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.accent,
        labelStyle: {fontSize: 14, fontWeight: '900'},
        itemStyle: {marginBottom: 8},
      }}>
      <Drawer.Screen
        name="Search"
        component={SearchStackScreen}
        options={{
          drawerLabel: 'Recherche',
          drawerIcon: ({color, focused}) => (
            <Icon
              name="magnify"
              size={24}
              style={{opacity: focused ? 1 : 0.6}}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
