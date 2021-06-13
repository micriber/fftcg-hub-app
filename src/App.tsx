import * as React from 'react';
import {Appearance, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthStackScreen} from './screens/Auth';
import AuthContextProvider from './contexts/AuthContextProvider';
import SearchCardsContextProvider from './contexts/SearchCardsContextProvider';
import {Provider as PaperProvider} from 'react-native-paper';
import themes from './theme';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';

const App = () => {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? themes.primary : themes.primary;
  const adUnitId = __DEV__
    ? TestIds.BANNER
    : 'ca-app-pub-4474507640801989/4425049680';

  return (
    <PaperProvider theme={theme}>
      <StatusBar backgroundColor={theme.colors.accent} />
      <SafeAreaProvider>
        <AuthContextProvider>
          <SearchCardsContextProvider>
            <NavigationContainer>
              <AuthStackScreen />
              <BannerAd unitId={adUnitId} size={BannerAdSize.ADAPTIVE_BANNER} />
            </NavigationContainer>
          </SearchCardsContextProvider>
        </AuthContextProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;
