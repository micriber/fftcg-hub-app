import React from 'react';
import {Keyboard, StyleSheet, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {SearchStackParamList} from './type';
import SearchForm, {SubmitParams} from '../../components/form/SearchForm';
import {Card} from '../../services/api/card';
import {SearchCardsContext} from '../../contexts/SearchCardsContext';
import FFCardsGridList from '../../components/FFCardsGridList';
import useFetchCards from '../../utils/hooks/useFetchCards';
import Loading from '../Loading';
import useDidMountEffect from '../../../external/hooks/useDidMountEffect';
import {HeaderBarContext} from '../../contexts/HeaderBarContext';
import analytics from '@react-native-firebase/analytics';

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
  const headerBarContext = React.useContext(HeaderBarContext);
  const [filters, setFilters] = React.useState({});
  const {
    page,
    refreshing,
    cardContext,
    state,
    loadCards,
    refresh,
    handleLoadMore,
    isEmpty,
  } = useFetchCards({
    cardsContext: SearchCardsContext,
  });

  const submit = async (fields: SubmitParams) => {
    await analytics().logEvent('search', fields);
    setFilters(fields);
    Keyboard.dismiss();
  };

  useDidMountEffect(() => {
    loadCards(filters);
  }, [filters]);

  const onCardPress = async (card: Card) => {
    await analytics().logEvent('card_press', {
      code: card.code,
      name: card.name,
    });
    navigation.navigate('CardDetails', {
      card,
      pageTitle: `${card.name} | ${card.code}`,
    });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRightContainerStyle: {
        opacity: isEmpty || refreshing ? 0 : 1,
      },
    });
  }, [isEmpty, navigation, refreshing]);

  const Layout = (
    <FFCardsGridList
      viewType={!headerBarContext.switchValue ? 'simple' : 'detail'}
      cards={cardContext.cardsList}
      displayOwnPin={true}
      onCardPress={onCardPress}
      onRefresh={refresh}
      onEndReached={
        cardContext.cardsList.length === 0 ? undefined : handleLoadMore
      }
      refreshing={refreshing}
      isEmpty={isEmpty}
    />
  );

  return (
    <View style={styles.container}>
      <SearchForm onSubmit={submit} style={styles.formContainer} />
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

const styles = StyleSheet.create({
  displayNone: {display: 'none'},
  container: {
    flex: 1,
  },
  formContainer: {
    elevation: 10,
  },
});

export default Search;
