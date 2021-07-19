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
import {useRef, useState} from 'react';
import {config} from './config';
import HeaderBarContextProvider from './contexts/HeaderBarContextProvider';
import analytics from '@react-native-firebase/analytics';
import {NavigationContainerRef} from '@react-navigation/core';

const App = () => {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? themes.primary : themes.primary;
  const adUnitId = __DEV__ ? TestIds.BANNER : config.google.adsBannerId;
  const [showAds, setShowAds] = useState(false);

  const navigationRef = useRef<NavigationContainerRef>(null);
  const routeNameRef = useRef('');
  return (
    <PaperProvider theme={theme}>
      <StatusBar backgroundColor={theme.colors.accent} />
      <SafeAreaProvider>
        <AuthContextProvider>
          <SearchCardsContextProvider>
            <HeaderBarContextProvider>
              <NavigationContainer
                ref={navigationRef}
                onReady={() => {
                  if (navigationRef && navigationRef.current) {
                    routeNameRef.current =
                      navigationRef.current.getCurrentRoute()?.name ?? '';
                  }
                }}
                onStateChange={async () => {
                  if (navigationRef && navigationRef.current) {
                    const currentRouteName =
                      navigationRef.current.getCurrentRoute()?.name ?? '';
                    const previousRouteName = routeNameRef.current;
                    if (previousRouteName !== currentRouteName) {
                      await analytics().logScreenView({
                        screen_name: currentRouteName,
                        screen_class: currentRouteName,
                      });
                    }
                    routeNameRef.current = currentRouteName;
                  }
                }}>
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
