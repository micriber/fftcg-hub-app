import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {Card, Cards, getCards, GetCardsParams} from '../services/api/card';
import {AuthContext} from '../contexts/AuthContext';
import useAsync from '../utils/hooks/useAsync';
import Loading from '../screens/Loading';
import FFCardsList from './FFCardsList';

type Props = {
  cardsFilter?: GetCardsParams;
  displayOwnPin?: boolean;
  isListView: boolean;
  onCardPress?: (card: Card) => void;
};

const FFCardsListContainer = ({
  isListView,
  displayOwnPin = false,
  cardsFilter = {},
  onCardPress = () => {},
}: Props) => {
  const {getIdToken} = React.useContext(AuthContext);
  const token = getIdToken();
  const perPage = 6;
  const [page, setPage] = React.useState(1);
  const [cards, setCards] = React.useState<Cards>([]);
  const addCards = (newCards: Cards) => setCards([...cards, ...newCards]);
  const [stopFetch, setStopFetch] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const loadCards = async () => {
    const data = await getCards({
      token: token!,
      params: {...cardsFilter, page, perPage},
    });

    if (data && 'cards' in data) {
      addCards(data.cards);
    }

    setStopFetch(false);
    setRefreshing(false);

    return data;
  };

  useEffect(() => {
    if (cards.length === 0 && refreshing) {
      loadCards();
    }
  }, [cards]);

  const state = useAsync(loadCards, [page]);

  const refresh = () => {
    if (!stopFetch) {
      setRefreshing(true);
      setPage(1);
      setCards([]);
    }
  };

  const handleLoadMore = () => {
    if (
      state.value &&
      'total' in state.value &&
      state.value.total > cards.length &&
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
      cards={cards}
      displayOwnPin={displayOwnPin}
      onCardPress={onCardPress}
      onRefresh={refresh}
      onEndReached={handleLoadMore}
      refreshing={refreshing}
    />
  );
};

export default FFCardsListContainer;
