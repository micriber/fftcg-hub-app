import React from 'react';
import {Text, Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {SearchStackParamList} from './type';
import {AuthContext} from '../../AuthContext';
import useAsync from '../../utils/hooks/useAsync';
import {Cards, getCards} from '../../services/api/card';
import Loading from '../Loading';
import HeaderSwitch from '../../components/common/HeaderSwitch';
import FFCardsList from '../../components/FFCardsList';
import BottomRightButton from '../../components/common/BottomRightButton';

type SearchResultScreenNavigationProp = StackNavigationProp<
  SearchStackParamList,
  'SearchResult'
>;

type SearchResultScreenRouteProp = RouteProp<
  SearchStackParamList,
  'SearchResult'
>;

type Props = {
  navigation: SearchResultScreenNavigationProp;
  route: SearchResultScreenRouteProp;
};

const Search = () => {
  const perPage = 50;
  const {getIdToken} = React.useContext(AuthContext);
  const [isListView, setIsListView] = React.useState(false);
  const [stopFetch, setStopFetch] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [cards, setCards] = React.useState<Cards>([]);
  const addCards = (newCards: Cards) => setCards([...cards, ...newCards]);
  const token = getIdToken();
  const state = useAsync(async () => {
    const data = await getCards({token: token!, params: {page, perPage}});
    if (data && 'data' in data) {
      addCards(data.data);
    }
    setStopFetch(false);
    return data;
  }, [page]);
  const handleLoadMore = () => {
    if (
      state.value &&
      'next_page' in state.value &&
      state.value?.next_page &&
      !stopFetch
    ) {
      setPage(page + 1);
      setStopFetch(true);
    }
  };
  console.log({value: state.value});
  // const {
  //   result: initialResult,
  //   error: initialError,
  //   loading: initialLoading,
  // } = useAsync(getCards, [token!, {page}]);

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
    <>
      <HeaderSwitch
        leftIconName="appstore-o"
        rightIconName="bars"
        value={isListView}
        onValueChange={setIsListView}
      />
      <FFCardsList
        isListView={isListView}
        cards={cards}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={5}>
        {state.loading && <Loading />}
        {state.error && <Text>{state.error}</Text>}
        {state.value && 'message' in state.value && (
          <Text>{state.value.message}</Text>
        )}
      </FFCardsList>
      <BottomRightButton
        iconName="search1"
        onPress={() => Alert.alert('Search button pressed')}
      />
    </>
  );
};

export default Search;
