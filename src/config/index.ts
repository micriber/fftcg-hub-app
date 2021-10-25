import Config from 'react-native-config';
import {TestIds} from '@react-native-firebase/admob';

export const config = {
  api: {
    baseUri: env('API_URI'),
  },
  google: {
    webClientId: env('GOOGLE_WEB_CLIENT_ID'),
    adsBannerId: env('ADS_BANNER_ID', TestIds.BANNER),
  },
  sentry: {
    dsn:
      'https://09bc5872e61446bf8067714028ff5340@o919929.ingest.sentry.io/5864591',
    environment: env('SENTRY_ENVIRONMENT', 'development'),
  },
  url: {
    playStore:
      'market://details?id=com.square_enix.android_googleplay.ffxivcomapp_e',
    appStore: 'itms-apps://itunes.apple.com/us/app/apple-store/myiosappid?mt=8',
  },
};

export type IConfig = typeof config;

function env(name: string): string | undefined;
function env(name: string, defaultValue: string): string;
function env(name: string, defaultValue?: string): string | undefined {
  return (Config[name] as string) || defaultValue;
}
