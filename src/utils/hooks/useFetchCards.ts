import React, {Context} from 'react';
import {getCards, GetCardsParams} from '../../services/api/card';
import {defaultValue} from '../../contexts/SearchCardsContext';
import useAsyncFn from './useAsyncFn';
import useDidMountEffect from './useDidMountEffect';
import {deepEqual} from '../object';

type Props = {
  // cardsFilter: GetCardsParams;
  cardsContext: Context<defaultValue>;
};

// ne pas passer cardFilter ici
function useFetchCards({cardsContext}: Props) {
  const isRendered = true;
  const cardContext = React.useContext(cardsContext);
  const perPage = 10;
  const [page, setPage] = React.useState(1);
  const [stopFetch, setStopFetch] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [search, setSearch] = React.useState({});
  const deps = [page];

  // garder cardFilter ici
  const loadCards = async (cardsFilter?: GetCardsParams) => {
    console.log('fired', {cardsFilter});
    if (cardsFilter && !deepEqual(search, cardsFilter)) {
      setPage(1);
      cardContext.setCardsList([]);
    }
    const filter = cardsFilter || search;
    if (isRendered) {
      cardsFilter && setSearch(cardsFilter);
    }
    console.log({msg: 'inside', filter, page});
    const data = await getCards({
      params: {...filter, page, perPage},
    });

    if (data && 'cards' in data) {
      cardContext.setCardsList([...cardContext.cardsList, ...data.cards]);
    }
    if (isRendered) {
      cardsFilter && setSearch(cardsFilter);
      setStopFetch(false);
      setRefreshing(false);
    }

    return data;
  };
  const [state, callback] = useAsyncFn(loadCards, deps, {loading: false});

  const refresh = () => {
    if (!stopFetch) {
      setRefreshing(true);
      cardContext.setCardsList([]);
      setPage(1);
      // callback();
    }
  };

  const handleLoadMore = async () => {
    console.log({value: state.value, stopFetch});
    if (
      state.value &&
      'total' in state.value &&
      state.value.total > cardContext.cardsList.length &&
      !stopFetch
    ) {
      console.log('there there');
      setPage(page + 1);
      setStopFetch(true);
      // console.log({page});
      // await callback();
      // console.log({msg: 'there there 2', value: state.value, stopFetch});
    }
  };

  useDidMountEffect(() => {
    console.log({page});
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
  };
}

export default useFetchCards;
