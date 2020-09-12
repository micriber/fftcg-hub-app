import React from 'react';
import FFCardSimple from './FFCardSimple';
import {FlatList, StyleSheet, View} from 'react-native';
import {Cards} from '../services/api/card';

type Props = {
  displayOwnPin?: boolean;
  isListView: boolean;
  cards: Cards;
  children?: React.ReactNode;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
};

const FFCardsList = ({
  isListView,
  cards,
  children,
  displayOwnPin = false,
  onEndReached = () => {},
  onEndReachedThreshold = 1,
}: Props) => {
  return (
    <View style={[isListView ? styles.listContainer : styles.gridContainer]}>
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
          />
        )}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
      />
      {React.Children.count(children) ? children : null}
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
  },
});

export default FFCardsList;
