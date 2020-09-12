import {createStackNavigator} from '@react-navigation/stack';
import CardDetails from './CardDetail';
import * as React from 'react';

const CardsStack = createStackNavigator();

const CardsStackScreen = () => (
  <CardsStack.Navigator>
    <CardsStack.Screen name="CardDetails" component={CardDetails} />
  </CardsStack.Navigator>
);

export {CardsStack, CardsStackScreen};
