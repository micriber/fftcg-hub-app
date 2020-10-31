import React from 'react';
import {Card} from '../services/api/card';

type defaultValue = {
  cardsList: Card[];
  setCardsList: ([]: Card[]) => void;
};

const defaultValue: defaultValue = {
  cardsList: [],
  setCardsList: ([]: Card[]) => {},
};

export const CollectionCardsContext = React.createContext(defaultValue);
