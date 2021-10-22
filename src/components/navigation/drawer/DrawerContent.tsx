import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  Avatar,
  Caption,
  Drawer,
  Text,
  Title,
  useTheme,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../../../contexts/AuthContext';
import packageConfig from '../../../../package.json';
import Logo from '../../../assets/logo/logo.svg';

type Props = {
  signOut: () => {};
} & DrawerContentComponentProps;

export const DrawerContent = (props: Props) => {
  const {user} = React.useContext(AuthContext);
  const theme = useTheme();
  const styles = StyleSheet.create({
    contentContainerStyle: {
      paddingTop: 0,
      height: '100%',
    },
    title: {
      fontSize: 20,
      lineHeight: 28,
      color: theme.colors.lightGrey,
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
      color: theme.colors.lightGrey,
      opacity: 0.6,
    },
    userInfoSection: {
      padding: 16,
      flexDirection: 'row',
      backgroundColor: theme.colors.active,
    },
    userInfoHeader: {
      marginLeft: 10,
      flexDirection: 'column',
    },
    drawerContent: {
      flex: 1,
      paddingTop: 0,
    },
    appVersion: {
      position: 'absolute',
      bottom: 5,
      right: 5,
      color: theme.colors.lightGrey,
      fontSize: 12,
    },
    icon: {
      opacity: 0.6,
    },
  });

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.contentContainerStyle}>
      <View style={styles.drawerContent}>
        <View style={[styles.userInfoSection]}>
          {/*<Avatar.Image*/}
          {/*  source={require('../../../assets/logo/ic_launcher_round.png')}*/}
          {/*  size={60}*/}
          {/*/>*/}
          <Logo
            height={60}
            width={60}
          />
          <View style={styles.userInfoHeader}>
            <Caption style={styles.title}>
              {user.info?.userName ?? user.info?.firstName ?? user.info?.email}
            </Caption>
          </View>
        </View>
        <Drawer.Section>
          <DrawerItemList {...props} />
          <DrawerItem
            label="Déconnexion"
            {...props}
            onPress={props.signOut}
            icon={() => (
              <Icon
                name="logout"
                size={24}
                style={styles.icon}
                color={props.inactiveTintColor}
              />
            )}
          />
        </Drawer.Section>
        <Text style={styles.appVersion}>v{packageConfig.version}</Text>
      </View>
    </DrawerContentScrollView>
  );
};
