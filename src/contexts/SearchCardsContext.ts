import React from 'react';
import {Card} from '../services/api/card';

export type defaultValue = {
  cardsList: Card[];
  setCardsList: ([]: Card[]) => void;
};

const defaultValue: defaultValue = {
  cardsList: [],
  setCardsList: ([]: Card[]) => {},
};

export const SearchCardsContext = React.createContext(defaultValue);
