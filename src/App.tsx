import * as React from 'react';
import {
  DarkTheme as RNDarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntIcon from 'react-native-vector-icons/AntDesign';
import About from './screens/About';
import Home from './screens/Home';
import Login from './screens/Login';
import {GoogleSignin} from '@react-native-community/google-signin';
import {signOut} from './services/google';
import {AuthContext} from './AuthContext';
import {DarkTheme} from './utils/theme';
import Loading from './screens/Loading';
import Settings from './screens/Settings';

interface ITabBarIcon {
  color: string;
  size: number;
}

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const HomeStack = createStackNavigator();
const AboutStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      options={{headerShown: false}}
      name="Home"
      component={Home}
    />
  </HomeStack.Navigator>
);

const AboutStackScreen = () => (
  <AboutStack.Navigator>
    <AboutStack.Screen
      options={{headerShown: false}}
      name="About"
      component={About}
    />
  </AboutStack.Navigator>
);

const SettingsStackScreen = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen
      options={{headerShown: false}}
      name="Settings"
      component={Settings}
    />
  </SettingsStack.Navigator>
);

const App = () => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? RNDarkTheme : DefaultTheme;
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  const authContext = React.useMemo(() => {
    return {
      getCurrentUser: async () => {
        const userInfo = await GoogleSignin.getCurrentUser();
        if (!userInfo) {
          setIsSignedIn(false);
        }

        return userInfo;
      },
      getTokens: async () => {
        return await GoogleSignin.getTokens();
      },
      signIn: async () => {
        setIsLoading(true);
        await GoogleSignin.hasPlayServices();
        await GoogleSignin.signIn();
        setIsSignedIn(true);
        setIsLoading(false);
      },
      signOut: async () => {
        setIsLoading(false);
        setIsSignedIn(false);
        await signOut();
      },
    };
  }, []);

  React.useEffect(() => {
    const getIsSignedIn = async () => {
      try {
        const userInfo = await GoogleSignin.signInSilently();
        userInfo && setIsSignedIn(true);
      } catch (e) {
        setIsSignedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    getIsSignedIn();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AppearanceProvider>
      <SafeAreaProvider>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer theme={theme}>
            {isSignedIn ? (
              <Tabs.Navigator
                initialRouteName="Home"
                tabBarOptions={{
                  activeTintColor: theme.colors.primary,
                }}>
                <Tabs.Screen
                  name="About"
                  component={AboutStackScreen}
                  options={{
                    tabBarLabel: 'About',
                    tabBarIcon: ({color, size}: ITabBarIcon) => (
                      <AntIcon name="camera" color={color} size={size} />
                    ),
                  }}
                />
                <Tabs.Screen
                  name="Home"
                  component={HomeStackScreen}
                  options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({color, size}: ITabBarIcon) => (
                      <AntIcon name="home" color={color} size={size} />
                    ),
                  }}
                />
                <Tabs.Screen
                  name="Settings"
                  component={SettingsStackScreen}
                  options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({color, size}: ITabBarIcon) => (
                      <AntIcon name="setting" color={color} size={size} />
                    ),
                  }}
                />
              </Tabs.Navigator>
            ) : (
              <AuthStack.Navigator
                screenOptions={{
                  headerShown: false,
                }}>
                <AuthStack.Screen name="Login" component={Login} />
              </AuthStack.Navigator>
            )}
          </NavigationContainer>
        </AuthContext.Provider>
      </SafeAreaProvider>
    </AppearanceProvider>
  );
};

export default App;
