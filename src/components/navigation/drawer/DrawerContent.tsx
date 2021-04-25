import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';
import {Avatar, Title, Drawer, Caption, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  signOut: () => {};
} & DrawerContentComponentProps;

export const DrawerContent = (props: Props) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    contentContainerStyle: {
      paddingTop: 0,
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
    },
    userInfoHeader: {
      marginLeft: 10,
      flexDirection: 'column',
    },
    drawerContent: {
      flex: 1,
      paddingTop: 0,
    },
  });

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.contentContainerStyle}>
      <View style={styles.drawerContent}>
        <View
          style={[
            styles.userInfoSection,
            {backgroundColor: theme.colors.active, padding: 16},
          ]}>
          <Avatar.Image
            source={require('../../../assets/logo/ic_launcher_round.png')}
            size={60}
          />
          <View style={styles.userInfoHeader}>
            <Title style={styles.title}>FFTCG Hub</Title>
            <Caption style={styles.caption}>Christophe Coquelet</Caption>
          </View>
        </View>
        <Drawer.Section>
          <DrawerItemList {...props} />
          <DrawerItem
            label="Déconnexion"
            {...props}
            onPress={props.signOut}
            icon={() => <Icon name="logout" size={24} style={{opacity: 0.6}} color={props.inactiveTintColor} />}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
};
