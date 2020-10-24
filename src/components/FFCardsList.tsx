import React from 'react';
import FFCardSimple from './FFCardSimple';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Card} from '../services/api/card';

type Props = {
  isListView: boolean;
  cards?: Card[];
  onCardPress?: (card: Card) => void;
  onEndReached?: () => void;
  onRefresh?: () => void;
  displayOwnPin?: boolean;
  refreshing?: boolean;
};

const FFCardsList = ({
  isListView,
  cards = [],
  displayOwnPin = false,
  refreshing = false,
  onCardPress = () => {},
  onRefresh = () => {},
  onEndReached = () => {},
}: Props) => {
  return (
    <View
      style={[
        isListView || cards.length === 0
          ? styles.listContainer
          : styles.gridContainer,
      ]}>
      <FlatList
        initialNumToRender={2}
        numColumns={isListView ? 1 : 2}
        key={isListView ? 0 : 1}
        data={cards}
        keyExtractor={(item) => item.code}
        renderItem={({item}) => (
          <FFCardSimple
            card={item}
            isListView={isListView}
            displayOwnPin={displayOwnPin}
            onPress={onCardPress}
          />
        )}
        onEndReached={onEndReached}
        onEndReachedThreshold={1}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          !refreshing ? (
            <Text style={styles.emptyMessage}>No result</Text>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    marginLeft: 20,
    flexDirection: 'row',
  },
  listContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    flexGrow: 1,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: '50%',
    width: '100%',
  },
});

export default FFCardsList;
