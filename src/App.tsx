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
import {useEffect, useRef, useState} from 'react';
import {config} from './config';
import HeaderBarContextProvider from './contexts/HeaderBarContextProvider';
import analytics from '@react-native-firebase/analytics';
import {NavigationContainerRef} from '@react-navigation/core';
import * as BootSplash from 'react-native-bootsplash';
import DrawerNavigator from './components/navigation/drawer';
import {initDb} from './services/db';

const App = () => {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? themes.primary : themes.primary;
  const adUnitId = __DEV__ ? TestIds.BANNER : config.google.adsBannerId;
  const [cardLoaded, setCardLoaded] = useState(false);
  const [cardLoad, setCardLoad] = useState(false);
  const [navLoaded, setNavLoaded] = useState(false);
  const [migrationCheck, setMigrationCheck] = useState(false);
  const [migrationChecked, setMigrationChecked] = useState(false);

  const fakeApiCallWithoutBadNetwork = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const loadCard = async () => {
    try {
      setCardLoad(true);
      console.log('card');
      await fakeApiCallWithoutBadNetwork(1000);
      setCardLoaded(true);
    } catch (error) {
      setCardLoaded(true);
    }
  };
  const database = async () => {
    try {
      setMigrationCheck(true);
      console.log('database');
      await initDb();
      setMigrationChecked(true);
    } catch (error) {
      setMigrationChecked(true);
    }
  };
  useEffect(() => {
    const exec = async () => {
      if (!migrationCheck) {
        await database();
      }
      if (!cardLoad && migrationChecked) {
        await loadCard();
      }
    };
    exec();
  });

  useEffect(() => {
    console.log(cardLoaded, navLoaded, migrationChecked, new Date());
    if (cardLoaded && navLoaded && migrationChecked) {
      BootSplash.hide();
    }
  }, [cardLoaded, navLoaded, migrationChecked]);

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
                  setNavLoaded(true);
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
                      analytics().logScreenView({
                        screen_name: currentRouteName,
                        screen_class: currentRouteName,
                      });
                    }
                    routeNameRef.current = currentRouteName;
                  }
                }}>
                {/*<Auth*/}
                {/*  userLogin={(userLoginShowAds: boolean) =>*/}
                {/*    setShowAds(userLoginShowAds)*/}
                {/*  }*/}
                {/*/>*/}
                <DrawerNavigator signOut={() => console.log('la')} />
                <BannerAd
                  unitId={adUnitId}
                  size={BannerAdSize.ADAPTIVE_BANNER}
                />
              </NavigationContainer>
            </HeaderBarContextProvider>
          </SearchCardsContextProvider>
        </AuthContextProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;
