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
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {AuthContext} from './AuthContext';
import About from './screens/About';
import Home from './screens/Home';
import Login from './screens/Login';
import Loading from './screens/Loading';
import Settings from './screens/Settings';
import {signOut} from './services/google';
import {googleLogin, UserInfo} from './services/api/user';
import {Alert} from 'react-native';

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

type UserState = {
  isSignedIn: boolean;
  info?: UserInfo;
  idToken?: string;
};

const App = () => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? RNDarkTheme : DefaultTheme;
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState<UserState>({isSignedIn: false});

  const authContext = React.useMemo(() => {
    return {
      getCurrentUser: () => {
        if (!user.isSignedIn || !user.info) {
          return null;
        }

        return user.info;
      },
      getTokens: async () => {
        return await GoogleSignin.getTokens();
      },
      signIn: async (silently = false) => {
        setIsLoading(true);
        await GoogleSignin.hasPlayServices();
        let userInfo;
        try {
          userInfo = silently
            ? await GoogleSignin.signInSilently()
            : await GoogleSignin.signIn();
        } catch (e) {
          if (e.code === statusCodes.SIGN_IN_REQUIRED) {
            setIsLoading(false);
            return;
          }

          console.log(e);
        }

        const idToken = userInfo?.idToken;
        console.log({userInfo});
        if (!idToken) {
          Alert.alert(
            'Erreur',
            'Impossible de récupérer les informations requises depuis Google.',
          );
          setIsLoading(false);
          return;
        }
        try {
          const signedInUser = await googleLogin(idToken);
          console.log(JSON.stringify(signedInUser, null, 2));
          if ((signedInUser as UserInfo).id) {
            setUser({isSignedIn: true, info: signedInUser as UserInfo});
          }
        } catch (e) {
          Alert.alert(
            'Erreur',
            'Un problème avec votre connexion est survenue. Merci de réessayer ultérieurement.',
          );
        } finally {
          setIsLoading(false);
        }
      },
      signOut: async () => {
        setIsLoading(false);
        setUser({isSignedIn: false});
        await signOut();
      },
    };
  }, [user.info, user.isSignedIn]);

  React.useEffect(() => {
    authContext.signIn(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AppearanceProvider>
      <SafeAreaProvider>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer theme={theme}>
            {user.isSignedIn ? (
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
