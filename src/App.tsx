import * as React from 'react';
import {Appearance, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Auth from './screens/Auth';
import AuthContextProvider from './contexts/AuthContextProvider';
import SearchCardsContextProvider from './contexts/SearchCardsContextProvider';
import {Provider as PaperProvider} from 'react-native-paper';
import themes from './theme';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';
import {useState} from 'react';
import {config} from './config';
import HeaderBarContextProvider from './contexts/HeaderBarContextProvider';

const App = () => {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? themes.primary : themes.primary;
  const adUnitId = __DEV__ ? TestIds.BANNER : config.google.adsBannerId;
  const [showAds, setShowAds] = useState(false);

  return (
    <PaperProvider theme={theme}>
      <StatusBar backgroundColor={theme.colors.accent} />
      <SafeAreaProvider>
        <AuthContextProvider>
          <SearchCardsContextProvider>
            <HeaderBarContextProvider>
              <NavigationContainer>
                <Auth
                  userLogin={(userLoginShowAds: boolean) =>
                    setShowAds(userLoginShowAds)
                  }
                />
                {showAds && (
                  <BannerAd
                    unitId={adUnitId}
                    size={BannerAdSize.ADAPTIVE_BANNER}
                  />
                )}
              </NavigationContainer>
            </HeaderBarContextProvider>
          </SearchCardsContextProvider>
        </AuthContextProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;
