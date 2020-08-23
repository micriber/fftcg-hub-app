import {createStackNavigator} from '@react-navigation/stack';
import About from './About';
import * as React from 'react';

const AboutStack = createStackNavigator();

const AboutStackScreen = () => (
  <AboutStack.Navigator>
    <AboutStack.Screen
      options={{headerShown: false}}
      name="About"
      component={About}
    />
  </AboutStack.Navigator>
);

export {AboutStack, AboutStackScreen};
