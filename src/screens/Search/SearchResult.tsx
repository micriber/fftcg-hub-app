import React from 'react';
import {Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {SearchStackParamList} from './type';
import {Card} from '../../services/api/card';
import HeaderSwitch from '../../components/common/HeaderSwitch';
import BottomRightButton from '../../components/common/BottomRightButton';
import FFCardsListContainer from '../../components/FFCardsListContainer';

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
        leftIconName="appstore-o"
        rightIconName="bars"
        value={isListView}
        onValueChange={setIsListView}
      />
      <FFCardsListContainer
        isListView={isListView}
        onCardPress={onCardPress}
        cardsFilter={{search}}
        collection={false}
      />
      <BottomRightButton
        iconName="search1"
        onPress={() => Alert.alert('Search button pressed')}
      />
    </>
  );
};

export default Search;
