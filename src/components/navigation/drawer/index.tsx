import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './DrawerContent';
import {SearchStackScreen} from '../../../screens/Search';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import About from '../../../screens/About';

const Drawer = createDrawerNavigator();

type Props = {
  signOut: () => {};
};

const styles = StyleSheet.create({
  iconFocus: {
    opacity: 1,
  },
  icon: {
    opacity: 0.6,
  },
});

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
              style={focused ? styles.iconFocus : styles.icon}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={About}
        options={{
          drawerLabel: 'À propos',
          drawerIcon: ({color, focused}) => (
            <Icon
              name="information"
              size={24}
              style={focused ? styles.iconFocus : styles.icon}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
