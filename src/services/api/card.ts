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
  cards: Cards;
  total: number;
};

export type UnauthorizedError = {
  message: string[];
};

export const getCards = async (
  token: string,
): Promise<GetCardsResponse | UnauthorizedError> => {
  return fetch(`${config.api.baseUri}/api/v1/cards`, {
    method: 'GET',
    headers: {
      authorization: `bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};
