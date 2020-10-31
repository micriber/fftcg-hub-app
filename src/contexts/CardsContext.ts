import React from 'react';
import {Card} from '../services/api/card';

type defaultValue = {
  collectionCardsList: Card[];
  searchCardsList: Card[];
  setCollectionCardsList: ([]: Card[]) => void;
  setSearchCardsList: ([]: Card[]) => void;
};

const defaultValue: defaultValue = {
  collectionCardsList: [],
  searchCardsList: [],
  setCollectionCardsList: ([]: Card[]) => {},
  setSearchCardsList: ([]: Card[]) => {},
};

export const CardsContext = React.createContext(defaultValue);
