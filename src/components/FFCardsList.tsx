import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Divider, useTheme} from 'react-native-paper';
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
  return (
    <View style={[styles.listContainer, {backgroundColor: colors.background}]}>
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
        ListEmptyComponent={!refreshing ? <FFCardsListEmpty /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
    // width: '100%',
    flexGrow: 1,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: '50%',
    width: '100%',
  },
});

export default FFCardsList;
