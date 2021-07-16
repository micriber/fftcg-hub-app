/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {GoogleSignin} from '@react-native-community/google-signin';
import {config} from './src/config';
import {init as sentryInit} from '@sentry/react-native';

GoogleSignin.configure({
  webClientId: config.google.webClientId,
  offlineAccess: false,
});

sentryInit({
  dsn: config.sentry.dsn,
  environment: config.sentry.environment,
});

AppRegistry.registerComponent(appName, () => App);
