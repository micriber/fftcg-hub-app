import * as React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/AntDesign';
import About from './screens/About';
import Home from './screens/Home';
import Login from './screens/Login';
import {GoogleSignin} from '@react-native-community/google-signin';
import {signOut} from './services/google';
import {AuthContext} from './AuthContext';
import Loading from './screens/Loading';

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const AboutStack = createStackNavigator();

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

const App = () => {
  const scheme = useColorScheme();
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
          <NavigationContainer
            theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
            {isSignedIn ? (
              <Tabs.Navigator
                initialRouteName="Home"
                tabBarOptions={{
                  activeTintColor: '#0000ff',
                }}>
                <Tabs.Screen
                  name="Home"
                  component={HomeStackScreen}
                  options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({color, size}) => (
                      <MaterialCommunityIcons
                        name="home"
                        color={color}
                        size={size}
                      />
                    ),
                  }}
                />
                <Tabs.Screen
                  name="About"
                  component={AboutStackScreen}
                  options={{
                    tabBarLabel: 'About',
                    tabBarIcon: ({color, size}) => (
                      <MaterialCommunityIcons
                        name="user"
                        color={color}
                        size={size}
                      />
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
