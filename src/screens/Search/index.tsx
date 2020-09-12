import {createStackNavigator} from '@react-navigation/stack';
import GlobalSearch from './GlobalSearch';
import SearchResult from './SearchResult';
import CardDetails from '../Cards/CardDetail';
import * as React from 'react';

const SearchStack = createStackNavigator();

const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen
      options={{headerShown: false}}
      name="GlobalSearch"
      component={GlobalSearch}
    />
    <SearchStack.Screen name="SearchResult" component={SearchResult} />
    <SearchStack.Screen name="CardDetails" component={CardDetails} />
  </SearchStack.Navigator>
);

export {SearchStack, SearchStackScreen};
