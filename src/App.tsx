import * as React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';

const Stack = createStackNavigator();

const App = () => {
  const scheme = useColorScheme();
  return (
    <AppearanceProvider>
      <SafeAreaProvider>
        <NavigationContainer
          theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen
              options={{title: 'My home'}}
              name="Home"
              component={Home}
            />
            <Stack.Screen name="About" component={About} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </AppearanceProvider>
  );
};

export default App;
