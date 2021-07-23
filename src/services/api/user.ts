import {config} from '../../config';
import {Api} from './index';

export type UserInfo = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  locale: 'fr';
  userName: string;
  authenticationType: 'google';
  createdAt: string;
  updatedAt: string;
};

export type UnauthorizedError = {
  message: string;
};

export const googleLogin = async (
  idToken: string,
): Promise<UserInfo | UnauthorizedError> => {
  const api = Api.getInstance();
  const _googleLogin = () =>
    api.fetch(`${config.api.baseUri}/api/v1/login/google`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken,
      }),
    });

  return await api.UpgradeWrapper(_googleLogin, {});
};
