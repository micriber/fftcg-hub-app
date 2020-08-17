/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {GoogleSignin} from '@react-native-community/google-signin';
import {config} from './src/config';

GoogleSignin.configure({
  webClientId: config.google.webClientId,
  offlineAccess: false,
});

AppRegistry.registerComponent(appName, () => App);
