import React, {Context, useRef, useState} from 'react';
import {getCards, GetCardsParams} from '../../services/api/card';
import {defaultValue} from '../../contexts/SearchCardsContext';
import useAsyncFn from './useAsyncFn';
import useDidMountEffect from './useDidMountEffect';
import {deepEqual} from '../object';

type Props = {
  cardsContext: Context<defaultValue>;
};

function useFetchCards({cardsContext}: Props) {
  const [shouldReRender, setShouldRerender] = React.useState(false);
  const toggleRerender = () => setShouldRerender(!shouldReRender);
  const cardContext = React.useContext(cardsContext);
  const perPage = 10;
  const [page, setPage] = React.useState(1);
  const [stopFetch, setStopFetch] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [search, setSearch] = React.useState({});
  const deps = [page, shouldReRender];

  // garder cardFilter ici
  const loadCards = async (cardsFilter?: GetCardsParams) => {
    if (cardsFilter && !deepEqual(search, cardsFilter)) {
      setPage(1);
      cardContext.setCardsList([]);
    }
    const filter = cardsFilter || search;
    cardsFilter && setSearch(cardsFilter);
    const data = await getCards({
      params: {...filter, page, perPage},
    });

    if (data && 'cards' in data) {
      cardContext.setCardsList([...cardContext.cardsList, ...data.cards]);
    }
    cardsFilter && setSearch(cardsFilter);
    setStopFetch(false);
    setRefreshing(false);

    return data;
  };

  const [state, callback] = useAsyncFn(loadCards, deps, {loading: false});
  // const isEmpty = !refreshing || (cardContext.cardsList.length === 0 && !stopFetch);
  const isEmpty = cardContext.cardsList.length === 0 && !state.loading;
  console.log({isEmpty, len: cardContext.cardsList.length, stopFetch, refreshing});

  const refresh = () => {
    if (!stopFetch) {
      setRefreshing(true);
      cardContext.setCardsList([]);
      setPage(1);
      setStopFetch(true);
      toggleRerender();
      // callback();
    }
  };

  const handleLoadMore = async () => {
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

  useDidMountEffect(() => {
    callback();
  }, deps);

  return {
    page,
    setPage,
    stopFetch,
    setStopFetch,
    refreshing,
    setRefreshing,
    search,
    setSearch,
    cardContext,
    state,
    handleLoadMore,
    refresh,
    loadCards: callback,
    isEmpty
  };
}

export default useFetchCards;
