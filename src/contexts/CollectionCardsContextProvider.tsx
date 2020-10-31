import React from 'react';
import {CollectionCardsContext} from './CollectionCardsContext';
import {Card} from '../services/api/card';

const CollectionCardsContextProvider = ({children}) => {
  const [cardsList, setCardsList] = React.useState<Card[]>([]);
  return (
    <CollectionCardsContext.Provider
      value={{
        cardsList,
        setCardsList,
      }}>
      {children}
    </CollectionCardsContext.Provider>
  );
};

export default CollectionCardsContextProvider;
