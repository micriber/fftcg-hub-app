import {createStackNavigator} from '@react-navigation/stack';
import Settings from './Settings';
import * as React from 'react';

const SettingsStack = createStackNavigator();

const SettingsStackScreen = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen
      options={{headerShown: false}}
      name="Settings"
      component={Settings}
    />
  </SettingsStack.Navigator>
);

export {SettingsStack, SettingsStackScreen};
