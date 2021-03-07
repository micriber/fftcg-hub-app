import React from 'react';
import {StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {FAB} from 'react-native-paper';
import {SearchStackParamList} from './type';
import {Card} from '../../services/api/card';
import HeaderSwitch from '../../components/common/HeaderSwitch';
import FFCardsListContainer from '../../components/FFCardsListContainer';
import {SearchCardsContext} from '../../contexts/SearchCardsContext';

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

const Search = ({route, navigation}: Props) => {
  const [isListView, setIsListView] = React.useState(false);
  const search = route.params.filter.search;

  const onCardPress = (card: Card) =>
    navigation.navigate('CardDetails', {
      card,
      pageTitle: `${card.name} | ${card.code}`,
    });

  return (
    <>
      <HeaderSwitch
        leftIconName="view-grid"
        rightIconName="format-list-bulleted"
        value={isListView}
        onValueChange={setIsListView}
      />
      <FFCardsListContainer
        isListView={isListView}
        onCardPress={onCardPress}
        cardsFilter={{search}}
        cardsContext={SearchCardsContext}
      />
      <FAB style={styles.fab} icon="arrow-up" onPress={() => {}} />
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Search;
