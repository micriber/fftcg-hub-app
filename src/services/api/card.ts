import {config} from '../../config';
import {Api} from './index';

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
  set: string;
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
  types?: string[];
  elements?: string[];
  opus?: string[];
  rarities?: string[];
  categories?: string[];
  cost?: number[];
  power?: number[];
};

const _getCards = async ({
  token,
  params = {},
}: {
  token: string;
  params: GetCardsParams;
}): Promise<Response> => {
  const page = params.page ? `page=${params.page}` : 'page=1';
  const perPage = params.perPage ? `&perPage=${params.perPage}` : '';
  const search = params.search ? `&search=${params.search}` : '';
  const owned = params.owned ? '&owned=true' : '';
  const types =
    params.types && params.types.length > 0
      ? `&types=${params.types?.join(',')}`
      : '';
  const elements =
    params.elements && params.elements.length > 0
      ? `&elements=${params.elements?.join(',')}`
      : '';
  const opus =
    params.opus && params.opus.length > 0
      ? `&opus=${params.opus?.join(',')}`
      : '';
  const rarities =
    params.rarities && params.rarities.length > 0
      ? `&rarities=${params.rarities?.join(',')}`
      : '';
  const categories =
    params.categories && params.categories.length > 0
      ? `&categories=${params.categories?.join(',')}`
      : '';
  const cost =
    params.cost && params.cost.length > 0
      ? `&cost=${params.cost?.join(',')}`
      : '';
  const power =
    params.power && params.power.length > 0
      ? `&power=${params.power?.join(',')}`
      : '';
  return fetch(
    `${config.api.baseUri}/api/v1/cards?${page}${perPage}${search}${owned}${types}${elements}${opus}${rarities}${categories}${cost}${power}`,
    {
      method: 'GET',
      headers: {
        authorization: `bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
};

export const getCards = async ({
  params = {},
}: {
  params: GetCardsParams;
}): Promise<GetCardsResponse | UnauthorizedError> => {
  const api = Api.getInstance();
  const callback = (token: string) => _getCards({token, params});
  return await api.refreshWrapper(callback, {json: true});
};

const _addCard = ({
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
  });
};

export const addCard = async ({
  code,
  version,
  quantity = 1,
}: {
  code: string;
  version: CardVersion;
  quantity?: number;
}) => {
  const api = Api.getInstance();
  const callback = (token: string) =>
    _addCard({token, code, version, quantity});
  return await api.refreshWrapper(callback, {json: false});
};

const _subtractCard = ({
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
  });
};

export const subtractCard = async ({
  code,
  version,
  quantity = 1,
}: {
  code: string;
  version: CardVersion;
  quantity?: number;
}) => {
  const api = Api.getInstance();
  const callback = (token: string) =>
    _subtractCard({token, code, version, quantity});
  return await api.refreshWrapper(callback, {json: false});
};
