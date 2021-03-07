import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {useTheme} from 'react-native-paper';
import FFCardSimple from './FFCardSimple';
import {Card} from '../services/api/card';

type Props = {
  isListView: boolean;
  cards?: Card[] | null;
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
  const {colors} = useTheme();
  const renderItem = ({item}: {item: Card}) => (
    <FFCardSimple
      card={item}
      isListView={isListView}
      displayOwnPin={displayOwnPin}
      onPress={onCardPress}
      containerStyle={styles.containerStyle}
    />
  );
  return (
    <View
      style={[
        isListView || (cards && cards.length === 0)
          ? styles.listContainer
          : styles.gridContainer,
        {backgroundColor: colors.background},
      ]}>
      {isListView ? (
        <FlatList
          initialNumToRender={1}
          numColumns={1}
          key={0}
          data={cards}
          keyExtractor={(item) => item.code}
          renderItem={renderItem}
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
      ) : (
        <FlatGrid
          key={1}
          spacing={10}
          keyExtractor={(item) => item.code}
          itemDimension={160}
          data={cards || []}
          renderItem={renderItem}
          onEndReached={onEndReached}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListEmptyComponent={
            !refreshing ? (
              <Text style={styles.emptyMessage}>No result</Text>
            ) : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
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
  containerStyle: {
    justifyContent: 'flex-end',
    borderRadius: 5,
  },
});

export default FFCardsList;
