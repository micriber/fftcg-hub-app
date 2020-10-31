import React from 'react';
import {CardsContext} from './CardsContext';
import {Card} from '../services/api/card';

const CardsContextProvider = ({children}) => {
  const [collectionCardsList, setCollectionCardsList] = React.useState<Card[]>([]);
  const [searchCardsList, setSearchCardsList] = React.useState<Card[]>([]);

  return (
    <CardsContext.Provider
      value={{
        collectionCardsList,
        searchCardsList,
        setCollectionCardsList,
        setSearchCardsList,
      }}>
      {children}
    </CardsContext.Provider>
  );
};

export default CardsContextProvider;
