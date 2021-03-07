import React from 'react';
import {Card} from '../../services/api/card';
import HeaderSwitch from '../../components/common/HeaderSwitch';
import FFCardsListContainer from '../../components/FFCardsListContainer';
import {CollectionCardsContext} from '../../contexts/CollectionCardsContext';

const Home = ({navigation}) => {
  const [isListView, setIsListView] = React.useState(false);

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
        cardsFilter={{owned: true}}
        cardsContext={CollectionCardsContext}
      />
    </>
  );
};

export default Home;
