import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Divider, FAB, useTheme} from 'react-native-paper';
import FFCardSimple from './FFCardSimple';
import FFCardsListEmpty from './FFCardsListEmpty';
import {Card} from '../services/api/card';
import {FlatGrid} from 'react-native-super-grid';

type Props = {
  cards?: Card[] | null;
  onCardPress?: (card: Card) => void;
  onEndReached?: () => void;
  onRefresh?: () => void;
  displayOwnPin?: boolean;
  refreshing?: boolean;
};

const FFCardsList = ({
  cards = [],
  displayOwnPin = false,
  refreshing = false,
  onCardPress = () => {},
  onRefresh = () => {},
  onEndReached = () => {},
}: Props) => {
  const {colors} = useTheme();
  const renderItem = ({item}: {item: Card}) => (
    <>
      <FFCardSimple
        card={item}
        viewType={'list'}
        displayOwnPin={displayOwnPin}
        onPress={onCardPress}
      />
      <Divider />
    </>
  );
  let refList;
  return (
    <View style={[styles.listContainer, {backgroundColor: colors.background}]}>
      <FlatList
        initialNumToRender={1}
        numColumns={1}
        key={0}
        data={cards}
        keyExtractor={(item) => item.code}
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
  listContainer: {
    margin: 10,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: '50%',
    width: '100%',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default FFCardsList;
