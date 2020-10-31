import * as React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {AppearanceProvider} from 'react-native-appearance';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthStackScreen} from './screens/Auth';
import AuthContextProvider from './contexts/AuthContextProvider';
import CollectionCardsContextProvider from './contexts/CollectionCardsContextProvider';
import SearchCardsContextProvider from './contexts/SearchCardsContextProvider';

const App = () => {
  // const scheme = useColorScheme();
  // const theme = scheme === 'dark' ? RNDarkTheme : DefaultTheme;
  const theme = DefaultTheme;

  return (
    <AppearanceProvider>
      <SafeAreaProvider>
        <AuthContextProvider>
          <CollectionCardsContextProvider>
            <SearchCardsContextProvider>
              <NavigationContainer theme={theme}>
                <AuthStackScreen theme={theme} />
              </NavigationContainer>
            </SearchCardsContextProvider>
          </CollectionCardsContextProvider>
        </AuthContextProvider>
      </SafeAreaProvider>
    </AppearanceProvider>
  );
};

export default App;
