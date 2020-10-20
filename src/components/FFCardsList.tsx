import React from 'react';
import FFCardSimple from './FFCardSimple';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Card, Cards, getCards, GetCardsParams} from '../services/api/card';
import {AuthContext} from '../AuthContext';
import useAsync from '../utils/hooks/useAsync';
import Loading from '../screens/Loading';

type Props = {
  getCardsParams?: GetCardsParams;
  displayOwnPin?: boolean;
  isListView: boolean;
  children?: React.ReactNode;
  onCardPress?: (card: Card) => void;
};

const FFCardsList = ({
  isListView,
  children,
  displayOwnPin = false,
  getCardsParams = {},
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
      params: {...getCardsParams, page, perPage},
    });

    if (data && 'cards' in data) {
      addCards(data.cards);
    }

    setStopFetch(false);
    setRefreshing(false);

    return data;
  };

  const state = useAsync(loadCards, [page]);

  const refresh = () => {
    if (!stopFetch) {
      setCards([]);
      setPage(1);
      setRefreshing(true);
      loadCards();
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
    <View style={[isListView ? styles.listContainer : styles.gridContainer]}>
      <FlatList
        initialNumToRender={2}
        numColumns={isListView ? 1 : 2}
        key={isListView ? 0 : 1}
        data={cards}
        keyExtractor={(item) => item.code}
        renderItem={({item}) => (
          <FFCardSimple
            card={item}
            isListView={isListView}
            displayOwnPin={displayOwnPin}
            onPress={onCardPress}
          />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={1}
        refreshing={refreshing}
        onRefresh={refresh}
      />
      {React.Children.count(children) ? children : null}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    marginLeft: 20,
    flexDirection: 'row',
  },
  listContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
  },
});

export default FFCardsList;
