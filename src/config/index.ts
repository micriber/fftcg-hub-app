import Config from 'react-native-config';

export const config = {
  api: {
    baseUri: env('API_URI'),
  },
  google: {
    webClientId: env('GOOGLE_WEB_CLIENT_ID'),
  },
};

export type IConfig = typeof config;

function env(name: string): string | undefined;
function env(name: string, defaultValue: string): string;
function env(name: string, defaultValue?: string): string | undefined {
  return (Config[name] as string) || defaultValue;
}
