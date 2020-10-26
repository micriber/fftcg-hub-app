import * as React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {AppearanceProvider} from 'react-native-appearance';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthStackScreen} from './screens/Auth';
import AuthContextProvider from './contexts/AuthContextProvider';

const App = () => {
  // const scheme = useColorScheme();
  // const theme = scheme === 'dark' ? RNDarkTheme : DefaultTheme;
  const theme = DefaultTheme;

  return (
    <AppearanceProvider>
      <SafeAreaProvider>
        <AuthContextProvider>
          <NavigationContainer theme={theme}>
            <AuthStackScreen theme={theme} />
          </NavigationContainer>
        </AuthContextProvider>
      </SafeAreaProvider>
    </AppearanceProvider>
  );
};

export default App;
