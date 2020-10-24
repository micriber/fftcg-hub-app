import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
import Search from './Search';
import CardDetails from '../Cards/CardDetail';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      options={{headerShown: false}}
      name="Home"
      component={Home}
    />
    <HomeStack.Screen name="CollectionSearch" component={Search} />
    <HomeStack.Screen
      name="CardDetails"
      component={CardDetails}
      // TODO: Remove this any
      options={({route}: any) =>
        route.params && (route.params as any).pageTitle
          ? {title: route.params.pageTitle}
          : {}
      }
    />
  </HomeStack.Navigator>
);

export {HomeStack, HomeStackScreen};
