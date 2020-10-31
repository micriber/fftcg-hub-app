import React from 'react';
import {Card} from '../services/api/card';
import {SearchCardsContext} from './SearchCardsContext';

const SearchCardsContextProvider = ({children}) => {
  const [cardsList, setCardsList] = React.useState<Card[]>([]);
  return (
    <SearchCardsContext.Provider
      value={{
        cardsList,
        setCardsList,
      }}>
      {children}
    </SearchCardsContext.Provider>
  );
};

export default SearchCardsContextProvider;
