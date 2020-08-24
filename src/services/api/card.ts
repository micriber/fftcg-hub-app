import {config} from '../../config';

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
};

export type Cards = Card[];
export type GetCardsResponse = {
  data: Cards;
  total: number;
  current_page: number;
  from: number;
  next_page: number | null;
  per_page: number;
  prev_page: number | null;
  to: number;
};

export type UnauthorizedError = {
  message: string[];
};

export type GetCardsParams = {
  page?: number;
  code?: string;
  perPage?: number;
};

export const getCards = async ({
  token,
  params = {},
}: {
  token: string;
  params: GetCardsParams;
}): Promise<GetCardsResponse | UnauthorizedError> => {
  console.log('BILLY');
  console.log({token, params});
  const page = params.page ? `page=${params.page}` : 'page=1';
  const perPage = params.perPage ? `&per_page=${params.perPage}` : '';
  return fetch(`${config.api.baseUri}/api/v1/cards?${page}${perPage}`, {
    method: 'GET',
    headers: {
      authorization: `bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};
