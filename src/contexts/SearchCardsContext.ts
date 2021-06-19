import React from 'react';
import {Card} from '../services/api/card';

export type defaultValue = {
  cardsList: Card[];
  setCardsList: ([]: Card[]) => void;
  filtersAreVisible: boolean;
  setFiltersAreVisible: (filtersAreVisible: boolean) => void;
};

const defaultValue: defaultValue = {
  cardsList: [],
  setCardsList: ([]: Card[]) => {},
  filtersAreVisible: false,
  setFiltersAreVisible: () => {},
};

export const SearchCardsContext = React.createContext(defaultValue);
