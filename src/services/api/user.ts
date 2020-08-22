import {config} from '../../config';

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
  message: string[];
};

export const googleLogin = (
  idToken: string,
): Promise<UserInfo | UnauthorizedError> => {
  return fetch(`${config.api.baseUri}/api/v1/login/google`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idToken,
    }),
  }).then((response) => response.json());
};
