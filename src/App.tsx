import * as React from 'react';
import {Appearance, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthStackScreen} from './screens/Auth';
import AuthContextProvider from './contexts/AuthContextProvider';
import SearchCardsContextProvider from './contexts/SearchCardsContextProvider';
import {Provider as PaperProvider} from 'react-native-paper';
import themes from './theme';

const App = () => {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? themes.primaryDark : themes.primary;

  return (
    <PaperProvider theme={theme}>
      <StatusBar backgroundColor={theme.colors.accent}/>
      <SafeAreaProvider>
        <AuthContextProvider>
          <SearchCardsContextProvider>
            <NavigationContainer>
              <AuthStackScreen theme={theme}/>
            </NavigationContainer>
          </SearchCardsContextProvider>
        </AuthContextProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;
