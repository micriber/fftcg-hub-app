import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {useTheme} from 'react-native-paper';
import FFCardSimple from './FFCardSimple';
import FFCardsListEmpty from './FFCardsListEmpty';
import {Card} from '../services/api/card';

type Props = {
  cards?: Card[] | null;
  onCardPress?: (card: Card) => void;
  onEndReached?: () => void;
  onRefresh?: () => void;
  displayOwnPin?: boolean;
  refreshing?: boolean;
};

const FFCardsGridList = ({
  cards = [],
  displayOwnPin = false,
  refreshing = false,
  onCardPress = () => {},
  onRefresh = () => {},
  onEndReached = () => {},
}: Props) => {
  const {colors} = useTheme();
  const renderItem = ({item}: {item: Card}) => (
    <FFCardSimple
      card={item}
      viewType={'grid'}
      displayOwnPin={displayOwnPin}
      onPress={onCardPress}
    />
  );
  return (
    <View style={[styles.gridContainer, {backgroundColor: colors.background}]}>
      <FlatGrid
        key={1}
        spacing={10}
        keyExtractor={(item) => item.code}
        itemDimension={175}
        data={cards || []}
        renderItem={renderItem}
        onEndReached={onEndReached}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={!refreshing ? <FFCardsListEmpty /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
  },
});

export default FFCardsGridList;
