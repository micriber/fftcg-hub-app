import {createStackNavigator, StackHeaderProps} from '@react-navigation/stack';
import Search from './Search';
import CardDetails from './CardDetail';
import * as React from 'react';
import HeaderSwitch from '../../components/common/HeaderSwitch';
import {
  HeaderDrawerNavigation,
  HeaderStackNavigation,
} from '../../components/navigation/header';
import {DrawerNavigationProp} from '@react-navigation/drawer/src/types';
import {ParamListBase} from '@react-navigation/native';

const SearchStack = createStackNavigator();

const SearchStackScreen = ({
  navigation,
}: {
  navigation: DrawerNavigationProp<ParamListBase>;
}) => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        options={{
          header: (headerProps: StackHeaderProps) => (
            <HeaderDrawerNavigation
              scene={headerProps.scene}
              navigation={navigation}
            />
          ),
          headerShown: true,
          headerTitle: 'Rechercher',
          headerRight: () => (
            <HeaderSwitch
              leftIconName="view-grid"
              rightIconName="format-list-bulleted"
            />
          ),
        }}
        name="GlobalSearch"
        component={Search}
      />
      <SearchStack.Screen
        name="CardDetails"
        component={CardDetails}
        // TODO: Remove this any
        options={({route}: any) => ({
          title:
            route.params && (route.params as any).pageTitle
              ? route.params.pageTitle
              : undefined,
          header: (headerProps: StackHeaderProps) => (
            <HeaderStackNavigation
              scene={headerProps.scene}
              navigation={headerProps.navigation}
            />
          ),
        })}
      />
    </SearchStack.Navigator>
  );
};

export {SearchStack, SearchStackScreen};
