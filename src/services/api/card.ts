import {config} from '../../config';

export type CardVersion = 'classic' | 'foil' | 'full-art';

export type UserCard = {
  quantity: number;
  version: CardVersion;
};

export type Card = {
  id: string;
  code: string;
  element: string;
  rarity: string;
  cost: string;
  power: string;
  category1: string;
  category2: string;
  multicard: string;
  exBurst: string;
  name: string;
  type: string;
  job: string;
  text: string;
  userCard: UserCard[];
};

export type Cards = Card[];
export type GetCardsResponse = {
  cards: Cards;
  total: number;
  page: number;
  perPage: number;
};

export type UnauthorizedError = {
  message: string[];
};

export type GetCardsParams = {
  page?: number;
  search?: string;
  owned?: boolean;
  perPage?: number;
};

export const getCards = async ({
  token,
  params = {},
}: {
  token: string;
  params: GetCardsParams;
}): Promise<GetCardsResponse | UnauthorizedError> => {
  const page = params.page ? `page=${params.page}` : 'page=1';
  const perPage = params.perPage ? `&perPage=${params.perPage}` : '';
  const search = params.search ? `&search=${params.search}` : '';
  const owned = params.owned ? '&owned=true' : '';
  return fetch(
    `${config.api.baseUri}/api/v1/cards?${page}${perPage}${search}${owned}`,
    {
      method: 'GET',
      headers: {
        authorization: `bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  ).then((response) => response.json());
};

export const addCard = ({
  token,
  code,
  version,
  quantity = 1,
}: {
  token: string;
  code: string;
  version: CardVersion;
  quantity?: number;
}) => {
  return fetch(`${config.api.baseUri}/api/v1/cards/${code}/add`, {
    method: 'POST',
    headers: {
      authorization: `bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version,
      quantity,
    }),
  }).then((response) => response.text());
};

export const subtractCard = ({
  token,
  code,
  version,
  quantity = 1,
}: {
  token: string;
  code: string;
  version: CardVersion;
  quantity?: number;
}): Promise<string | UnauthorizedError> => {
  return fetch(`${config.api.baseUri}/api/v1/cards/${code}/subtract`, {
    method: 'POST',
    headers: {
      authorization: `bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version,
      quantity,
    }),
  }).then((response) => response.text());
};
