import React from 'react';
import {Card} from '../services/api/card';
import {SearchCardsContext} from './SearchCardsContext';

type Props = {
  children: React.ReactNode;
};

const SearchCardsContextProvider = ({children}: Props) => {
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
