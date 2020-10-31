import * as React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {AppearanceProvider} from 'react-native-appearance';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthStackScreen} from './screens/Auth';
import AuthContextProvider from './contexts/AuthContextProvider';
import CardsContextProvider from './contexts/CardsContextProvider';

const App = () => {
  // const scheme = useColorScheme();
  // const theme = scheme === 'dark' ? RNDarkTheme : DefaultTheme;
  const theme = DefaultTheme;

  return (
    <AppearanceProvider>
      <SafeAreaProvider>
        <AuthContextProvider>
          <CardsContextProvider>
            <NavigationContainer theme={theme}>
              <AuthStackScreen theme={theme} />
            </NavigationContainer>
          </CardsContextProvider>
        </AuthContextProvider>
      </SafeAreaProvider>
    </AppearanceProvider>
  );
};

export default App;
