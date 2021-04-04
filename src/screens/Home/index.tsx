import React from 'react';
import {createStackNavigator, StackHeaderProps} from '@react-navigation/stack';
import Home from './Home';
import Search from './Search';
import CardDetails from '../Cards/CardDetail';
import Header from '../../components/navigation/header';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      header: (headerProps: StackHeaderProps) => <Header {...headerProps} />,
    }}>
    <HomeStack.Screen
      options={{
        headerTitle: 'Home',
        headerShown: true,
      }}
      name="Home"
      component={Home}
    />
    <HomeStack.Screen name="CollectionSearch" component={Search} />
    <HomeStack.Screen
      name="CardDetails"
      component={CardDetails}
      // TODO: Remove this any
      options={(props) => {
        const {route} = props;
        const pageTitle = route.params && (route.params as any).pageTitle;
        return {
          ...(pageTitle ? {title: pageTitle} : {}),
          headerShown: true,
        };
      }}
    />
  </HomeStack.Navigator>
);

export {HomeStack, HomeStackScreen};
