import React from 'react';
import {Alert} from 'react-native';
import {Card} from '../../services/api/card';
import HeaderSwitch from '../../components/common/HeaderSwitch';
import BottomRightButton from '../../components/common/BottomRightButton';
import FFCardsListContainer from '../../components/FFCardsListContainer';

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
        leftIconName="appstore-o"
        rightIconName="bars"
        value={isListView}
        onValueChange={setIsListView}
      />
      <FFCardsListContainer
        isListView={isListView}
        onCardPress={onCardPress}
        cardsFilter={{owned: true}}
        collection={true}
      />
      <BottomRightButton
        iconName="search1"
        onPress={() => Alert.alert('Search button pressed')}
      />
    </>
  );
};

export default Home;
