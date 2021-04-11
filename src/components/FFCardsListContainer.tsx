import React, {Context, useEffect, useRef} from 'react';
import {Text} from 'react-native';
import {Card, getCards, GetCardsParams} from '../services/api/card';
// import useAsync from '../utils/hooks/useAsync';

// import {useAsync} from './useAsync';

import Loading from '../screens/Loading';
import FFCardsList from './FFCardsList';
import {defaultValue, SearchCardsContext} from '../contexts/SearchCardsContext';
import FFCardsGridList from './FFCardsGridList';
import useAsyncFn from '../utils/hooks/useAsyncFn';
import {RevealFromBottomAndroid} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';

type Props = {
  executeFetch: boolean;
  cardsFilter?: GetCardsParams;
  displayOwnPin?: boolean;
  isListView: boolean;
  onCardPress?: (card: Card) => void;
  cardsContext: Context<defaultValue>;
};

const FFCardsListContainer = ({
  executeFetch = false,
  isListView,
  displayOwnPin = true,
  cardsFilter = {},
  onCardPress = () => {},
  cardsContext = SearchCardsContext,
}: Props) => {
  let isRendered: React.MutableRefObject<boolean> = useRef(false);
  const cardContext = React.useContext(cardsContext);
  const perPage = 6;
  const [page, setPage] = React.useState(1);
  const [stopFetch, setStopFetch] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [search, setSearch] = React.useState({});

  const loadCards = async () => {
    console.log('fired');
    const data = await getCards({
      params: {...cardsFilter, page, perPage},
    });

    // console.log({data});

    if (data && 'cards' in data) {
      cardContext.setCardsList([
        ...(cardsFilter !== search ? [] : cardContext.cardsList),
        ...data.cards,
      ]);
    }
    if (isRendered) {
      setSearch(cardsFilter);
      setStopFetch(false);
      setRefreshing(false);
    }

    return data;
  };

  const loadCardsIfFired = async () => executeFetch && (await loadCards());

  const [state, callback] = useAsyncFn(loadCardsIfFired, [], {
    loading: false,
  });

  useEffect(() => {
    isRendered.current = true;
    callback();
    return () => {
      isRendered.current = false;
    };
  }, [callback]);

  useEffect(() => {
    if (cardContext.cardsList.length === 0 && executeFetch) {
      loadCards();
    }
  }, [cardContext.cardsList, executeFetch]);

  // const state = useAsync(loadCards, []);

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

  if (!isListView) {
    return (
      <FFCardsGridList
        cards={cardContext.cardsList}
        displayOwnPin={displayOwnPin}
        onCardPress={onCardPress}
        onRefresh={refresh}
        onEndReached={handleLoadMore}
        refreshing={refreshing}
      />
    );
  }

  return (
    <FFCardsList
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
