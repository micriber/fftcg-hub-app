import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {SearchStackParamList} from './type';
import {Card} from '../../services/api/card';
import HeaderSwitch from '../../components/common/HeaderSwitch';
import FFCardsListContainer from '../../components/FFCardsListContainer';
import {SearchCardsContext} from '../../contexts/SearchCardsContext';
import Header from '../../components/navigation/header';

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

  const onCardPress = (card: Card) =>
    navigation.navigate('CardDetails', {
      card,
      pageTitle: `${card.name} | ${card.code}`,
    });

  return (
    <>
      <FFCardsListContainer
        isListView={isListView}
        onCardPress={onCardPress}
        cardsFilter={{search}}
        cardsContext={SearchCardsContext}
      />
    </>
  );
};

export default Search;
