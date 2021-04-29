import {createStackNavigator, StackHeaderProps} from '@react-navigation/stack';
import Search from './Search';
import CardDetails from '../Cards/CardDetail';
import * as React from 'react';
import Header from '../../components/navigation/header';

const SearchStack = createStackNavigator();

const SearchStackScreen = () => (
  <SearchStack.Navigator
    screenOptions={{
      header: (headerProps: StackHeaderProps) => <Header {...headerProps} />,
    }}>
    <SearchStack.Screen
      options={{headerShown: true, headerTitle: 'Rechercher'}}
      name="GlobalSearch"
      component={Search}
    />
    <SearchStack.Screen
      name="CardDetails"
      component={CardDetails}
      // TODO: Remove this any
      options={({route}: any) =>
        route.params && (route.params as any).pageTitle
          ? {title: route.params.pageTitle}
          : {}
      }
    />
  </SearchStack.Navigator>
);

export {SearchStack, SearchStackScreen};
