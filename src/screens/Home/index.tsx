import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
import Search from './Search';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      options={{headerShown: false}}
      name="Home"
      component={Home}
    />
    <HomeStack.Screen name="CollectionSearch" component={Search} />
  </HomeStack.Navigator>
);

export {HomeStack, HomeStackScreen};
