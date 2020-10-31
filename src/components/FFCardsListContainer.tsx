import React, {Context, useEffect} from 'react';
import {Text} from 'react-native';
import {Card, getCards, GetCardsParams} from '../services/api/card';
import {AuthContext} from '../contexts/AuthContext';
import useAsync from '../utils/hooks/useAsync';
import Loading from '../screens/Loading';
import FFCardsList from './FFCardsList';
import {defaultValue, SearchCardsContext} from '../contexts/SearchCardsContext';

type Props = {
  cardsFilter?: GetCardsParams;
  displayOwnPin?: boolean;
  isListView: boolean;
  onCardPress?: (card: Card) => void;
  cardsContext: Context<defaultValue>;
};

const FFCardsListContainer = ({
  isListView,
  displayOwnPin = false,
  cardsFilter = {},
  onCardPress = () => {},
  cardsContext = SearchCardsContext,
}: Props) => {
  const {getIdToken} = React.useContext(AuthContext);
  const cardContext = React.useContext(cardsContext);
  const token = getIdToken();
  const perPage = 6;
  const [page, setPage] = React.useState(1);
  const [stopFetch, setStopFetch] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [search, setSearch] = React.useState({});

  const loadCards = async () => {
    const data = await getCards({
      token: token!,
      params: {...cardsFilter, page, perPage},
    });

    if (data && 'cards' in data) {
      cardContext.setCardsList([
        ...(cardsFilter !== search ? [] : cardContext.cardsList),
        ...data.cards,
      ]);
    }

    setSearch(cardsFilter);
    setStopFetch(false);
    setRefreshing(false);

    return data;
  };

  useEffect(() => {
    if (cardContext.cardsList.length === 0 && refreshing) {
      loadCards();
    }
  }, [cardContext.cardsList]);

  const state = useAsync(loadCards, [page]);

  const refresh = () => {
    if (!stopFetch) {
      setRefreshing(true);
      cardContext.setCardsList([]);
      setPage(1);
    }
  };

  const handleLoadMore = () => {
    if (
      state.value &&
      'total' in state.value &&
      state.value.total > cardContext.cardsList.length &&
      !stopFetch
    ) {
      setPage(page + 1);
      setStopFetch(true);
    }
  };

  if (state.loading && page === 1) {
    return <Loading />;
  }
  if (state.error && page === 1) {
    return <Text>{state.error}</Text>;
  }
  if (
    (!state.value || (state.value && 'message' in state.value)) &&
    page === 1
  ) {
    return <Text>{JSON.stringify(state.value?.message)}</Text>;
  }

  return (
    <FFCardsList
      isListView={isListView}
      cards={cardContext.cardsList}
      displayOwnPin={displayOwnPin}
      onCardPress={onCardPress}
      onRefresh={refresh}
      onEndReached={handleLoadMore}
      refreshing={refreshing}
    />
  );
};

export default FFCardsListContainer;
