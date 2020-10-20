import React from 'react';
import {Alert} from 'react-native';
import {Card} from '../../services/api/card';
import FFCardsList from '../../components/FFCardsList';
import HeaderSwitch from '../../components/common/HeaderSwitch';
import BottomRightButton from '../../components/common/BottomRightButton';

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
      <FFCardsList
        isListView={isListView}
        onCardPress={onCardPress}
        getCardsParams={{owned: true}}
      />
      <BottomRightButton
        iconName="search1"
        onPress={() => Alert.alert('Search button pressed')}
      />
    </>
  );
};

export default Home;
