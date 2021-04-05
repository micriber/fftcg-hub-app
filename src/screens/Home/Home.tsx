import React from 'react';
import {Card} from '../../services/api/card';
import HeaderSwitch from '../../components/common/HeaderSwitch';
import FFCardsListContainer from '../../components/FFCardsListContainer';
import {CollectionCardsContext} from '../../contexts/CollectionCardsContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList} from './type';
import Header from '../../components/navigation/header';

export type HomeScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home = ({navigation}: Props) => {
  const [isListView, setIsListView] = React.useState(false);

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
    <FFCardsListContainer
      isListView={isListView}
      onCardPress={onCardPress}
      cardsFilter={{owned: true}}
      cardsContext={CollectionCardsContext}
    />
  );
};

export default Home;
