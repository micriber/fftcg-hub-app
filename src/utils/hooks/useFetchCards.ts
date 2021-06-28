import React, {Context} from 'react';
import {getCards, GetCardsParams} from '../../services/api/card';
import {defaultValue} from '../../contexts/SearchCardsContext';
import useAsyncFn from './../../../external/hooks/useAsyncFn';
import useDidMountEffect from './../../../external/hooks/useDidMountEffect';
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
    const newSearch: boolean = !!(
      cardsFilter && !deepEqual(search, cardsFilter)
    );

    if (newSearch && page !== 1) {
      cardContext.setCardsList([]);
      cardsFilter && setSearch(cardsFilter);
      setPage(1);
      return;
    }

    const filter = cardsFilter || search;
    const data = await getCards({
      params: {...filter, page: newSearch ? 1 : page, perPage},
    });

    if (data && 'cards' in data) {
      cardContext.setCardsList(
        newSearch ? [...data.cards] : [...cardContext.cardsList, ...data.cards],
      );
    }

    cardsFilter && setSearch(cardsFilter);
    setStopFetch(false);
    setRefreshing(false);

    return data;
  };

  const [state, callback] = useAsyncFn(loadCards, deps, {loading: false});
  const isEmpty = cardContext.cardsList.length === 0 && !state.loading;

  const refresh = () => {
    if (!stopFetch) {
      setRefreshing(true);
      cardContext.setCardsList([]);
      setPage(1);
      setStopFetch(true);
      toggleRerender();
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
    callback(search);
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
    isEmpty,
  };
}

export default useFetchCards;
