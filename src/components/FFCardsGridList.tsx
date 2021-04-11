import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {FAB, useTheme} from 'react-native-paper';
import FFCardSimple from './FFCardSimple';
import FFCardsListEmpty from './FFCardsListEmpty';
import {Card} from '../services/api/card';
import FFCardsListContainer from './FFCardsListContainer';

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
  let refList;
  return (
    <View style={[styles.gridContainer, {backgroundColor: colors.background}]}>
      <FlatGrid
        key={1}
        spacing={10}
        keyExtractor={(item) => item.code}
        itemDimension={175}
        data={cards || []}
        renderItem={renderItem}
        onEndReached={({distanceFromEnd}) => {
          if (distanceFromEnd < 0) {
            return;
          }
          onEndReached();
        }}
        onEndReachedThreshold={1.5}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={!refreshing ? <FFCardsListEmpty /> : null}
        ref={(ref) => (refList = ref)}
      />

      <FAB
        style={styles.fab}
        icon="arrow-up"
        onPress={() => {
          refList.scrollToIndex({
            index: 0,
            animated: true,
          });
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  gridContainer: {
    // flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default FFCardsGridList;
