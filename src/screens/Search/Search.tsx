import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {SearchStackParamList} from './type';
import Header from '../../components/navigation/header';
import HeaderSwitch from '../../components/common/HeaderSwitch';
import SearchForm, {SubmitParams} from '../../components/form/SearchForm';
import {Card} from '../../services/api/card';
import {SearchCardsContext} from '../../contexts/SearchCardsContext';
import FFCardsGridList from '../../components/FFCardsGridList';
import FFCardsList from '../../components/FFCardsList';
import useFetchCards from '../../utils/hooks/useFetchCards';
import Loading from '../Loading';
import useDidMountEffect from '../../utils/hooks/useDidMountEffect';

type SearchScreenNavigationProp = StackNavigationProp<
  SearchStackParamList,
  'GlobalSearch'
>;
type SearchScreenRouteProp = RouteProp<SearchStackParamList, 'GlobalSearch'>;

type Props = {
  navigation: SearchScreenNavigationProp;
  route: SearchScreenRouteProp;
};

const Search = ({navigation}: Props) => {
  const [isListView, setIsListView] = React.useState(false);
  const [filters, setFilters] = React.useState({});
  const {
    page,
    refreshing,
    cardContext,
    state,
    loadCards,
    refresh,
    handleLoadMore,
  } = useFetchCards({
    cardsContext: SearchCardsContext,
  });

  const submit = async (fields: SubmitParams) => {
    console.log('Receive: ', fields);
    setFilters(fields);
  };

  useDidMountEffect(() => {
    console.log({page});
    loadCards(filters);
  }, [filters]);

  const onCardPress = (card: Card) =>
    navigation.navigate('CardDetails', {
      card,
      pageTitle: `${card.name} | ${card.code}`,
    });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: (headerProps) => (
        <Header
          {...headerProps}
          headerRight={
            <HeaderSwitch
              leftIconName="view-grid"
              rightIconName="format-list-bulleted"
              value={isListView}
              onValueChange={setIsListView}
            />
          }
        />
      ),
    });
  }, [isListView, navigation]);

  // {...(isListView ? {style: styles.displayNone} : {})}
  // {...(!isListView ? {style: styles.displayNone} : {})}

  const Layout = !isListView ? (
    <FFCardsGridList
      cards={cardContext.cardsList}
      displayOwnPin={true}
      onCardPress={onCardPress}
      onRefresh={refresh}
      onEndReached={
        cardContext.cardsList.length === 0 ? undefined : handleLoadMore
      }
      refreshing={refreshing}
    />
  ) : (
    <FFCardsList
      cards={cardContext.cardsList}
      displayOwnPin={true}
      onCardPress={onCardPress}
      onRefresh={refresh}
      onEndReached={
        cardContext.cardsList.length === 0 ? undefined : handleLoadMore
      }
      refreshing={refreshing}
    />
  );

  return (
    <View>
      <SearchForm onSubmit={submit} />
      {state.loading && page === 1 && <Loading />}
      {state.error && page === 1 && <Text>{state.error}</Text>}
      {(!state.value || (state.value && 'message' in state.value)) &&
      page === 1 ? (
        <Text>{JSON.stringify(state.value?.message)}</Text>
      ) : (
        Layout
      )}
    </View>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = StyleSheet.create({
  displayNone: {display: 'none'},
});

export default Search;
