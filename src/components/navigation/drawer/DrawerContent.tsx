import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';
import {Avatar, Title, Drawer, Caption} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  signOut: () => {};
} & DrawerContentComponentProps;

export const DrawerContent = (props: Props) => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.contentContainerStyle}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={require('../../../assets/logo/ic_launcher_round.png')}
            size={75}
          />
          <View style={{marginLeft: 15, flexDirection: 'column'}}>
            <Title style={styles.title}>FFTCG Hub</Title>
            <Caption style={styles.caption}>Christophe Coquelet</Caption>
          </View>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItemList {...props} />
          <DrawerItem
            label="Logout"
            onPress={props.signOut}
            icon={() => <Icon name="logout" size={26} />}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: 0,
  },
  title: {
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  userInfoSection: {
    paddingLeft: 20,
    backgroundColor: '#3d6391',
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
  },
  drawerContent: {
    flex: 1,
    paddingTop: 0,
  },
  drawerSection: {
    marginTop: 15,
  },
});
