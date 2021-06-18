import React from 'react';
import {Card} from '../services/api/card';
import {SearchCardsContext} from './SearchCardsContext';

type Props = {
  children: React.ReactNode;
};

const SearchCardsContextProvider = ({children}: Props) => {
  const [cardsList, setCardsList] = React.useState<Card[]>([]);
  const [filtersAreVisible, setFiltersAreVisible] = React.useState(false);
  return (
    <SearchCardsContext.Provider
      value={{
        cardsList,
        setCardsList,
        filtersAreVisible,
        setFiltersAreVisible,
      }}>
      {children}
    </SearchCardsContext.Provider>
  );
};

export default SearchCardsContextProvider;
